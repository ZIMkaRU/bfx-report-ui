import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Icons from 'icons'

import UserItemMenu from './SignInList.menu'
import { getUserType, getMenuOptionTitle } from './SignInList.helpers'

export const SignInListItem = ({
  user,
  handleUserSelect,
  handleAddAccounts,
}) => {
  const { t } = useTranslation()
  const { email, isApiKeysAuth } = user

  const addAccounts = useCallback(
    () => handleAddAccounts(email),
    [email],
  )

  return (
    <div className='sign-in-list--wrapper'>
      <div
        className='sign-in-list--item'
        onClick={() => handleUserSelect(user)}
      >
        <Icons.USER_CIRCLE />
        <div className='sign-in-list--item-description'>
          <p className='sign-in-list--item-title'>
            {email}
          </p>
          <p className='sign-in-list--item-type'>
            {t(getUserType(user))}
          </p>
        </div>
      </div>
      {isApiKeysAuth && (
        <div className='sign-in-list--icon'>
          <UserItemMenu
            handleAddAccounts={addAccounts}
            handleAccountsTitle={getMenuOptionTitle(user)}
          />
        </div>
      )}
    </div>
  )
}

SignInListItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isApiKeysAuth: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  }).isRequired,
  handleUserSelect: PropTypes.func.isRequired,
  handleAddAccounts: PropTypes.func.isRequired,
}

export default memo(SignInListItem)
