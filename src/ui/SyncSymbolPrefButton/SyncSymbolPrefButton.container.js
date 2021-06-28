import { connect } from 'react-redux'

import { editPublicTradesSymbolPref } from 'state/sync/actions'
import {
  getIsSyncing,
  getPublicFundingSymbols,
  getPublicFundingStartTime,
} from 'state/sync/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'

import SyncSymbolPrefButton from './SyncSymbolPrefButton'

const mapStateToProps = (state) => {
  const syncSymbols = getPublicFundingSymbols(state)
  const startTime = getPublicFundingStartTime(state)

  return {
    isSyncing: getIsSyncing(state),
    syncSymbols,
    startTime: startTime || getTimeFrame(state).start,
  }
}

const mapDispatchToProps = {
  setSyncPref: (symbol, startTime) => editPublicTradesSymbolPref(symbol, startTime.getTime()),
}

const SyncSymbolPrefButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SyncSymbolPrefButton)

export default SyncSymbolPrefButtonContainer
