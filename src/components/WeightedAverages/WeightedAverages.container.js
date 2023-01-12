import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
  fetchDerivatives,
} from 'state/weightedAverages/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getInactivePairs, getPairs } from 'state/symbols/selectors'
import {
  getEntries,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getExistingPairs,
} from 'state/weightedAverages/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import WeightedAverages from './WeightedAverages'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_WEIGHTED_AVERAGES),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_WEIGHTED_AVERAGES),
  dataReceived: getDataReceived(state),
  entries: getEntries(state),
  existingPairs: getExistingPairs(state),
  getFullTime: getFullTime(state),
  inactivePairs: getInactivePairs(state),
  pairs: getPairs(state),
  pageLoading: getPageLoading(state),
  targetPairs: getTargetPairs(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  addTargetPair,
  clearTargetPairs,
  fetchData: fetchDerivatives,
  refresh,
  removeTargetPair,
  setTargetPairs,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(WeightedAverages)
