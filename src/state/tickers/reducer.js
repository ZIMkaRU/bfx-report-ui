// https://docs.bitfinex.com/v2/reference#TICKERS-history
import _get from 'lodash/get'

import {
  formatInternalSymbol, formatSymbolToPair, mapSymbol, mapPair,
} from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addPair,
  basePairState,
  fetchFail,
  fetchNext,
  fetchPrev,
  getPageOffset,
  jumpPage,
  removePair,
  setPairs,
  setTimeRange,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...basePairState,
  targetPairs: [mapPair('BTC:USD')],
}

const TYPE = queryTypes.MENU_TICKERS

export function TickersReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_TICKERS: {
      if (!_get(payload, ['data', 'res'])) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { data, limit, pageSize } = payload
      const { res, nextPage } = data
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      let smallestMts
      const entries = res.map((entry) => {
        const {
          ask,
          bid,
          mtsUpdate,
          symbol,
        } = entry
        const internalPair = mapPair(formatInternalSymbol(symbol))
        // save new pair to updatePairs list
        if (updatePairs.indexOf(internalPair) === -1) {
          updatePairs.push(internalPair)
        }
        // log smallest mts
        if (nextPage === false
          && (!smallestMts || smallestMts > mtsUpdate)
        ) {
          smallestMts = mtsUpdate
        }
        return {
          ask,
          bid,
          mtsUpdate,
          pair: formatSymbolToPair(symbol).split('/').map(mapSymbol).join('/'),
        }
      })
      const [offset, pageOffset] = getPageOffset(state, entries, limit, pageSize)
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset,
        pageOffset,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_TICKERS:
      return fetchNext(TYPE, state, payload)
    case types.FETCH_PREV_TICKERS:
      return fetchPrev(TYPE, state, payload)
    case types.JUMP_TICKERS_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_PAIR:
      return addPair(state, payload, initialState)
    case types.REMOVE_PAIR:
      return removePair(state, payload, initialState)
    case types.SET_PAIRS:
      return setPairs(state, payload, initialState)
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default TickersReducer
