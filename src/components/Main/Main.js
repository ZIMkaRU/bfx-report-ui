import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import FundingCreditHistory from 'components/FundingCreditHistory'
import FundingLoanHistory from 'components/FundingLoanHistory'
import FundingOfferHistory from 'components/FundingOfferHistory'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Trades from 'components/Trades'
import ExportDialog from 'components/ExportDialog'
import queryType from 'state/query/constants'
import { getTraget, MAPPING } from 'state/query/utils'
import ToggleMenu from 'ui/ToggleMenu'

import { propTypes, defaultProps } from './Main.props'
import CustomDialog from './CustomDialog'

const {
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
} = queryType

class Main extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickCustom = this.handleClickCustom.bind(this)
    this.handleCustomDialogClose = this.handleCustomDialogClose.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.startQuery = this.startQuery.bind(this)
    this.handleClickExport = this.handleClickExport.bind(this)
    this.handleExportDialogClose = this.handleExportDialogClose.bind(this)
    this.startExport = this.startExport.bind(this)
  }

  state = {
    isExportOpen: false,
    startDate: null,
    endDate: new Date(),
  }

  handleClick(target) {
    const { history } = this.props
    // remove url params
    history.push(MAPPING[target].path + history.location.search)
  }

  handleClickCustom(e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(true)
  }

  handleCustomDialogClose(e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(false)
  }

  handleRangeChange(range) {
    this.setState({
      startDate: range[0],
      endDate: range[1],
    })
  }

  startQuery() {
    const { startDate, endDate } = this.state
    const { setCustomTimeRange, showCustomDialog } = this.props
    if (startDate !== null && endDate !== null) {
      setCustomTimeRange(startDate.getTime(), endDate.getTime())
    }
    showCustomDialog(false)
  }

  handleClickExport() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.prepareExport()
    this.setState({ isExportOpen: true })
  }

  handleExportDialogClose(e) {
    e.preventDefault()
    this.setState({ isExportOpen: false })
  }

  startExport() {
    const { location, exportCsv } = this.props
    const target = getTraget(location.pathname)
    exportCsv(target)
    this.setState({ isExportOpen: false })
  }

  render() {
    const {
      authStatus,
      authIsShown,
      history,
      intl,
      isCustomOpen,
      location,
      menuMode,
    } = this.props
    const {
      endDate,
      isExportOpen,
      startDate,
    } = this.state
    const target = getTraget(location.pathname)

    return authStatus && !authIsShown ? (
      <div className='row'>
        <ToggleMenu
          target={target}
          handleClickCustom={this.handleClickCustom}
          history={history}
          intl={intl}
          menuMode={menuMode}
        />
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-10'>
          <Switch>
            <Route
              exact
              path='/'
              component={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_LEDGERS].path}
              component={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_TRADES].path}
              component={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_ORDERS].path}
              component={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_DEPOSITS].path}
              component={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_WITHDRAWALS].path}
              component={() => <Movements type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_FCREDIT].path}
              component={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_FLOAN].path}
              component={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_FOFFER].path}
              component={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
          </Switch>
        </div>
        <CustomDialog
          type={target}
          isCustomOpen={isCustomOpen}
          handleCustomDialogClose={this.handleCustomDialogClose}
          handleRangeChange={this.handleRangeChange}
          startQuery={this.startQuery}
          startDate={startDate}
          endDate={endDate}
        />
        <ExportDialog
          type={target}
          isExportOpen={isExportOpen}
          handleExportDialogClose={this.handleExportDialogClose}
          startExport={this.startExport}
        />
      </div>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default injectIntl(Main)
