import types from './constants'

/**
 * Create an action to fetch Tax Report data.
 */
export function fetchTaxReport() {
  return {
    type: types.FETCH_TAX_REPORT,
  }
}

/**
 * Create an action to fetch Snapshot data.
 * @param {string} payload section to fetch
 */
export function fetchTaxReportSnapshot(payload) {
  return {
    type: types.FETCH_SNAPSHOT,
    payload,
  }
}

/**
 * Create an action to note fetch fail.
 * @param {Object} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

/**
 * Create an action to refresh Tax Report.
 * * @param {object} payload object contains options
 */
export function refresh(payload) {
  return {
    type: types.REFRESH,
    payload,
  }
}

/**
 * Create an action to update Tax Report.
 * @param {Object[]} payload data set
 */
export function updateTaxReport(payload) {
  return {
    type: types.UPDATE_TAX_REPORT,
    payload,
  }
}

/**
 * Create an action to update Tax Report Snapshot.
 * @param {Object} payload data set and section
 */
export function updateTaxReportSnapshot(payload) {
  return {
    type: types.UPDATE_TAX_REPORT_SNAPSHOT,
    payload,
  }
}

export function fetchTaxReportTransactions() {
  return {
    type: types.FETCH_TRANSACTIONS,
  }
}

export function refreshTaxReportTransactions() {
  return {
    type: types.REFRESH_TRANSACTIONS,
  }
}

export function updateTaxReportTransactions(payload) {
  return {
    type: types.UPDATE_TRANSACTIONS,
    payload,
  }
}

export default {
  fetchFail,
  fetchTaxReport,
  fetchTaxReportSnapshot,
  refresh,
  updateTaxReport,
  updateTaxReportSnapshot,
  fetchTaxReportTransactions,
  refreshTaxReportTransactions,
  updateTaxReportTransactions,
}
