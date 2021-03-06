export const getPublicTrades = state => state.publicTrades

export const getDataReceived = state => getPublicTrades(state).dataReceived
export const getEntries = state => getPublicTrades(state).entries
export const getOffset = state => getPublicTrades(state).offset
export const getPageLoading = state => getPublicTrades(state).pageLoading
export const getPageOffset = state => getPublicTrades(state).pageOffset
export const getTargetPair = state => getPublicTrades(state).targetPair
export const getNextPage = state => getPublicTrades(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPair,
  getPublicTrades,
}
