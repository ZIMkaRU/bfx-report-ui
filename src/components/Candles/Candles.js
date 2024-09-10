import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import TimeRange from 'ui/TimeRange'
import GoToButton from 'ui/GoToButton'
import PairSelector from 'ui/PairSelector'
import Timeframe from 'ui/CandlesTimeframe'
import RefreshButton from 'ui/RefreshButton'
import SectionSwitch from 'ui/SectionSwitch'
import Candlestick from 'ui/Charts/Candlestick'
import CandlesSyncPref from 'ui/CandlesSyncPref'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch } from 'state/utils'

const TYPE = queryConstants.MENU_CANDLES

class Candles extends PureComponent {
  static propTypes = {
    candles: PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.shape({
        time: PropTypes.number,
      })),
      isLoading: PropTypes.bool,
      nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    }),
    currentFetchParams: PropTypes.shape({
      pair: PropTypes.string.isRequired,
      timeframe: PropTypes.string.isRequired,
    }).isRequired,
    isChartLoading: PropTypes.bool,
    fetchData: PropTypes.func.isRequired,
    pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
    params: PropTypes.shape({
      pair: PropTypes.string.isRequired,
      timeframe: PropTypes.string.isRequired,
    }).isRequired,
    refresh: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    toggleGoToRangeDialog: PropTypes.func.isRequired,
    trades: PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
      })),
      isLoading: PropTypes.bool,
      nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    }),
  }

  static defaultProps = {
    trades: {},
    candles: {},
    isChartLoading: false,
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  onPairSelect = (pair) => {
    const { setParams } = this.props
    setParams({ pair })
  }

  onTimeframeChange = (timeframe) => {
    const { setParams } = this.props
    setParams({ timeframe })
  }

  render() {
    const {
      candles,
      fetchData,
      isChartLoading,
      pairs,
      params,
      refresh,
      t,
      trades,
      toggleGoToRangeDialog,
    } = this.props
    const { pair, timeframe } = params
    const chartClassName = isChartLoading ? 'candlestick--loading' : ''

    let showContent
    if (!candles.entries.length && candles.isLoading) {
      showContent = <Loading />
    } else if (!candles.entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <>
          {isChartLoading && (<Loading />)}
          <Candlestick
            trades={trades}
            candles={candles}
            fetchData={fetchData}
            className={chartClassName}
          />
        </>
      )
    }

    return (
      <Card
        elevation={Elevation.ZERO}
        className='candles col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('candles.title')}
          </SectionHeaderTitle>
          <SectionSwitch target={TYPE} />
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
                pairs={pairs}
                currentPair={pair}
                onPairSelect={this.onPairSelect}
              />
            </SectionHeaderItem>
            <Timeframe
              value={timeframe}
              onChange={this.onTimeframeChange}
            />
            <RefreshButton onClick={refresh} />
            <CandlesSyncPref />
            <GoToButton onClick={toggleGoToRangeDialog} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default Candles
