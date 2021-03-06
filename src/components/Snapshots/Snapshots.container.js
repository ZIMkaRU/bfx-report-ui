import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchSnapshots,
  refresh,
} from 'state/snapshots/actions'
import {
  getDataReceived,
  getPositionsEntries,
  getPositionsTickersEntries,
  getWalletsTickersEntries,
  getWalletsEntries,
  getTimestamp,
} from 'state/snapshots/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

import Snapshots from './Snapshots'

const mapStateToProps = (state = {}) => ({
  currentTime: getTimestamp(state),
  positionsEntries: getPositionsEntries(state),
  positionsTickersEntries: getPositionsTickersEntries(state),
  walletsTickersEntries: getWalletsTickersEntries(state),
  walletsEntries: getWalletsEntries(state),
  loading: !getDataReceived(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchSnapshots,
  refresh,
}

const SnapshotsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshots))

export default SnapshotsContainer
