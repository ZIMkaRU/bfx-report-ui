import TAX_REPORT_SECTIONS from 'components/TaxReport/TaxReport.sections'

export const getTaxReport = state => state.taxReport
export const getStartSnapshot = state => getTaxReport(state).startSnapshot
export const getEndSnapshot = state => getTaxReport(state).endSnapshot
export const getTaxTransactions = state => getTaxReport(state).transactions

export const getDataReceived = state => getTaxReport(state).dataReceived
export const getPageLoading = state => getTaxReport(state).pageLoading
export const getTransactionsDataReceived = state => getTaxTransactions(state)?.dataReceived ?? false
export const getTransactionsPageLoading = state => getTaxTransactions(state)?.pageLoading ?? false
export const getTransactionsData = state => getTaxTransactions(state)?.data ?? []
export const getTransactionsStrategy = state => getTaxTransactions(state)?.strategy

export const getData = (state) => {
  const {
    startingPositionsSnapshot,
    endingPositionsSnapshot,
    finalState,
  } = getTaxReport(state)

  return {
    startingPositionsSnapshot,
    endingPositionsSnapshot,
    finalState,
  }
}
export const getSnapshot = (state, section) => {
  if (section === TAX_REPORT_SECTIONS.START_SNAPSHOT) {
    return getStartSnapshot(state)
  }
  return getEndSnapshot(state)
}
export const getSnapshotDataReceived = (state, section) => {
  if (section === TAX_REPORT_SECTIONS.START_SNAPSHOT) {
    return getStartSnapshot(state).dataReceived
  }
  return getEndSnapshot(state).dataReceived
}
export const getSnapshotPageLoading = (state, section) => {
  if (section === TAX_REPORT_SECTIONS.START_SNAPSHOT) {
    return getStartSnapshot(state).pageLoading
  }
  return getEndSnapshot(state).pageLoading
}

export default {
  getDataReceived,
  getPageLoading,
  getSnapshot,
  getSnapshotDataReceived,
  getSnapshotPageLoading,
  getTaxReport,
  getTaxTransactions,
  getTransactionsData,
  getTransactionsDataReceived,
  getTransactionsPageLoading,
  getTransactionsStrategy,
}
