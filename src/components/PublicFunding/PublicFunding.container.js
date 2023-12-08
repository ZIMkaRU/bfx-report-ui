import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPublicFunding,
  refresh,
  setTargetSymbol,
} from 'state/publicFunding/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTargetSymbol,
} from 'state/publicFunding/selectors'
import { getColumns } from 'state/filters/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import PublicFunding from './PublicFunding'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_PUBLIC_FUNDING),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_PUBLIC_FUNDING),
  entries: getFilteredEntries(state, queryConstants.MENU_PUBLIC_FUNDING, getEntries(state)),
  getFullTime: getFullTime(state),
  isSyncRequired: getIsSyncRequired(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbol: getTargetSymbol(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchPublicFunding,
  refresh,
  setTargetSymbol,
}

const PublicFundingContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicFunding))

export default PublicFundingContainer
