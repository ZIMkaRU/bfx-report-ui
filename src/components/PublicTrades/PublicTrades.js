import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import ColumnsFilter from 'ui/ColumnsFilter'
import RefreshButton from 'ui/RefreshButton'
import PairSelector from 'ui/PairSelector'
import Pagination from 'ui/Pagination'
import SyncPrefButton from 'ui/SyncPrefButton'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, setPair } from 'state/utils'

import getColumns from './PublicTrades.columns'
import { propTypes, defaultProps } from './PublicTrades.props'

const TYPE = queryConstants.MENU_PUBLIC_TRADES

class PublicTrades extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  onPairSelect = pair => setPair(TYPE, this.props, pair)

  render() {
    const {
      columns,
      columnsWidth,
      getFullTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetPair,
      timeOffset,
    } = this.props

    const tableColumns = getColumns({
      columnsWidth,
      filteredData: entries,
      getFullTime,
      t,
      targetPair,
      timeOffset,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <div className='data-table-wrapper'>
          <DataTable
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination target={TYPE} loading={pageLoading} />
        </div>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('publictrades.title')}</SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.date')}
              </SectionHeaderItemLabel>
              <TimeRange className='section-header-time-range' />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <PairSelector
                currentPair={targetPair}
                onPairSelect={this.onPairSelect}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.columns')}
              </SectionHeaderItemLabel>
              <ColumnsFilter target={TYPE} />
            </SectionHeaderItem>
            <RefreshButton onClick={refresh} />
            <SyncPrefButton sectionType={TYPE} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

PublicTrades.propTypes = propTypes
PublicTrades.defaultProps = defaultProps

export default withTranslation('translations')(PublicTrades)
