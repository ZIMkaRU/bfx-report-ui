export const getMovements = state => state.movements

export const getExistingCoins = state => getMovements(state).existingCoins
export const getTargetSymbols = state => getMovements(state).targetSymbols
export const getDataReceived = state => getMovements(state).dataReceived
export const getEntries = state => getMovements(state).entries
export const getOffset = state => getMovements(state).offset
export const getPageLoading = state => getMovements(state).pageLoading
export const getPageOffset = state => getMovements(state).pageOffset
export const getNextPage = state => getMovements(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getMovements,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
}
