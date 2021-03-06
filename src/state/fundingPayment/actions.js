import types from './constants'

/**
 * Create an action to fetch Funding Payment data.
 * @param {string} symbol symbol param from url
 */
export function fetchFPayment(symbol) {
  return {
    type: types.FETCH_FPAYMENT,
    payload: symbol,
  }
}

/**
 * Create an action to note fetch fail.
 * @param {number} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

/**
 * Create an action to fetch next Funding Payment data.
 * @param {number} queryLimit query limit
 */
export function fetchNextFPayment(queryLimit) {
  return {
    type: types.FETCH_NEXT_FPAYMENT,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Funding Payment data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevFPayment(queryLimit) {
  return {
    type: types.FETCH_PREV_FPAYMENT,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Funding Payment page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_FPAYMENT_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh Funding Payment.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Funding Payment.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateFPayment(data, limit, pageSize) {
  return {
    type: types.UPDATE_FPAYMENT,
    payload: {
      data,
      limit,
      pageSize,
    },
  }
}

/**
 * Create an action to set target symbol.
 * @param {string[]} symbols symbols
 */
export function setTargetSymbols(symbols) {
  return {
    type: types.SET_SYMBOLS,
    payload: symbols,
  }
}

/**
 * Create an action to add target symbol.
 * @param {string} symbol symbol
 */
export function addTargetSymbol(symbol) {
  return {
    type: types.ADD_SYMBOL,
    payload: symbol,
  }
}

/**
 * Create an action to remove target symbol.
 * @param {string} symbol symbol
 */
export function removeTargetSymbol(symbol) {
  return {
    type: types.REMOVE_SYMBOL,
    payload: symbol,
  }
}

export default {
  addTargetSymbol,
  fetchFail,
  fetchFPayment,
  fetchNextFPayment,
  fetchPrevFPayment,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateFPayment,
}
