import _filter from 'lodash/filter'
import { isEmpty, isEqual } from '@bitfinex/lib-js-util-base'

export const USE_API_KEY = 'subaccounts.use_api_key'

export const getFilledAccounts = (accounts, t) => accounts
  .filter((account) => {
    const {
      email,
      password,
      isNotProtected,
      apiKey,
      apiSecret,
    } = account

    if (isEqual(email, t(USE_API_KEY))) {
      return (apiKey && apiSecret)
    }

    return (email && (isNotProtected || password))
  })

export const EMPTY_ACCOUNT = {
  email: '',
  password: '',
  isNotProtected: true,
  apiKey: '',
  apiSecret: '',
}

export const MAX_ACCOUNTS = 15

export const filterRestrictedUsers = (users) => _filter(
  users, user => !user?.isRestrictedToBeAddedToSubAccount
  && isEmpty(user?.subUsers),
)

export default {
  getFilledAccounts,
  filterRestrictedUsers,
  EMPTY_ACCOUNT,
  MAX_ACCOUNTS,
  USE_API_KEY,
}
