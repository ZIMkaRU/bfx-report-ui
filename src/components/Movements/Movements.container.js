import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchMovements,
  addTargetSymbol,
  getMovementInfo,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/movements/actions'
import { jumpPage } from 'state/pagination/actions'
import { getTetherNames } from 'state/symbols/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getExistingCoins,
  getTargetSymbols,
} from 'state/movements/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'

import Movements from './Movements'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  tetherNames: getTetherNames(state),
  dataReceived: getDataReceived(state),
  existingCoins: getExistingCoins(state),
  targetSymbols: getTargetSymbols(state),
  isSyncRequired: getIsSyncRequired(state),
  columns: getColumns(state, queryConstants.MENU_MOVEMENTS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_MOVEMENTS),
  entries: getFilteredEntries(state, queryConstants.MENU_MOVEMENTS, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  jumpPage,
  addTargetSymbol,
  getMovementInfo,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
  fetchData: fetchMovements,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Movements)
