import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getQueryLimit } from 'state/query/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getAffiliatesEarnings } from 'state/affiliatesEarnings/selectors'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { mapRequestSymbols } from 'state/symbols/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'
import LEDGERS_CATEGORIES from 'var/ledgersCategories'

import types from './constants'
import actions from './actions'

const TYPE = queryTypes.MENU_AFFILIATES_EARNINGS

function getReqLedgers({
  start,
  end,
  targetSymbols,
  filter,
}) {
  const params = {
    start,
    end,
    filter,
    limit: getQueryLimit(TYPE),
    category: LEDGERS_CATEGORIES.AFFILIATE_REBATE,
    symbol: targetSymbols.length ? mapRequestSymbols(targetSymbols) : undefined,
  }
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchAffiliatesEarnings() {
  try {
    const { targetSymbols } = yield select(getAffiliatesEarnings)
    const { smallestMts } = yield select(getPaginationData, TYPE)

    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqLedgers, {
      start,
      end,
      targetSymbols,
      filter,
    })
    yield put(actions.updateAffiliatesEarnings(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'affiliatesearnings.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'affiliatesearnings.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshAffiliatesEarnings() {
  yield put(refreshPagination(TYPE))
}

function* fetchAffiliatesEarningsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* affiliatesEarningsSaga() {
  yield takeLatest(types.FETCH_AFFILIATES_EARNINGS, fetchAffiliatesEarnings)
  yield takeLatest([
    types.REFRESH, types.ADD_SYMBOL, types.REMOVE_SYMBOL, types.CLEAR_SYMBOLS,
  ], refreshAffiliatesEarnings)
  yield takeLatest(types.FETCH_FAIL, fetchAffiliatesEarningsFail)
}
