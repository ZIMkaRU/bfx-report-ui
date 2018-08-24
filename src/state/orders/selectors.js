const getOrders = state => state.orders

export const getDataReceived = state => getOrders(state).dataReceived
export const getEntries = state => getOrders(state).entries
export const getOffset = state => getOrders(state).offset
export const getPageLoading = state => getOrders(state).pageLoading
export const getPageOffset = state => getOrders(state).pageOffset

export default {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
}
