import {
  call,
  fork,
  take,
  race,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _isEmpty from 'lodash/isEmpty'

import WS from 'state/ws'
import wsTypes from 'state/ws/constants'
import wsSignIn from 'state/ws/signIn'
import { selectAuth } from 'state/auth/selectors'
import { formatAuthDate, makeFetchCall } from 'state/utils'
import tokenRefreshSaga from 'state/auth/tokenRefresh/saga'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { fetchSymbols } from 'state/symbols/actions'
import { refreshToken, tokenRefreshStart, tokenRefreshStop } from 'state/auth/tokenRefresh/actions'
import config from 'config'

import types from './constants'
import actions from './actions'

const updateAuthErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'auth.auth',
  detail: JSON.stringify(msg),
})

function* onAuthSuccess(result) {
  try {
    yield put(actions.updateAuth(result))
    yield put(fetchSymbols())

    if (config.showFrameworkMode) {
      if (!WS.isConnected) {
        WS.connect()

        const { connectTimeout } = yield race({
          wsConnect: take(wsTypes.WS_CONNECT),
          connectTimeout: delay(3000),
        })

        if (connectTimeout) {
          yield put(updateAuthErrorStatus())
          yield put(actions.updateAuthStatus())
          return
        }
      }

      const wsAuth = yield call(wsSignIn)
      if (!wsAuth) {
        yield put(updateAuthErrorStatus())
        yield put(actions.updateAuthStatus())

        return
      }
    } else {
      // on app load try to refresh the token in case user refreshed the page and some time have already passed
      yield put(refreshToken())
      yield put(tokenRefreshStart())
    }

    yield put(updateSuccessStatus({
      id: 'status.success',
      topic: 'auth.auth',
      time: formatAuthDate(new Date()),
    }))

    yield put(actions.authSuccess(result))
    yield put(actions.hideAuth())
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* signUp({ payload }) {
  try {
    const {
      authToken,
      apiKey,
      apiSecret,
      password,
      isNotProtected,
    } = payload

    const authParams = {
      authToken,
      apiKey,
      apiSecret,
      password: isNotProtected ? undefined : password,
      isNotProtected: config.showFrameworkMode ? isNotProtected : undefined,
    }

    const method = config.showFrameworkMode ? 'signUp' : 'verifyUser'
    const { result, error } = yield call(makeFetchCall, method, null, authParams)

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      const { email, isSubAccount } = result
      const newUser = {
        email,
        isSubAccount,
        isNotProtected,
      }
      yield put(actions.addUser(newUser))
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      if (authToken) {
        yield put(actions.updateAuth({ authToken: '' }))
      }

      if (config.showFrameworkMode) {
        yield put(updateErrorStatus({
          id: 'status.signUpFail',
        }))
      } else {
        yield put(updateErrorStatus({
          id: 'status.fail',
          topic: 'auth.auth',
          detail: JSON.stringify(error),
        }))
      }
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* signIn({ payload }) {
  try {
    const {
      email,
      isNotProtected,
      isSubAccount,
      password,
    } = payload

    const authParams = {
      email,
      password: isNotProtected ? undefined : password,
      isSubAccount,
    }
    const { result, error } = yield call(makeFetchCall, 'signIn', null, authParams)

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      if (error.code === 401) {
        yield put(updateErrorStatus({
          id: 'status.signInFail',
        }))
        return
      }

      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* fetchUsers() {
  try {
    const { result: users } = yield call(makeFetchCall, 'getUsers')

    if (users) {
      yield put(actions.setUsers(users))
      if (!users.length) {
        yield put(actions.clearAuth())
      }
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* checkAuth() {
  try {
    if (config.showFrameworkMode) {
      yield put(actions.fetchUsers())
    }

    const auth = yield select(selectAuth)
    if (_isEmpty(auth)) {
      return
    }

    if (config.showFrameworkMode) {
      yield put(actions.signIn(auth))
      return
    }

    yield put(actions.signUp(auth))
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* recoverPassword({ payload }) {
  try {
    const {
      apiKey,
      apiSecret,
      password,
      isNotProtected,
    } = payload
    const newPassword = isNotProtected ? undefined : password
    const { result, error } = yield call(makeFetchCall, 'recoverPassword', null, {
      apiKey,
      apiSecret,
      newPassword,
      isSubAccount: false,
      isNotProtected,
    })

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* logout() {
  yield put(tokenRefreshStop())
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  yield takeLatest(types.FETCH_USERS, fetchUsers)
  yield takeLatest(types.RECOVER_PASSWORD, recoverPassword)
  yield takeLatest(types.SIGN_UP, signUp)
  yield takeLatest(types.SIGN_IN, signIn)
  yield takeLatest(types.LOGOUT, logout)
  yield fork(tokenRefreshSaga)
}
