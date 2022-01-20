import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'icons'

const SubUsersList = ({
  email,
  onToggle,
  subUsers,
  subUsersToRemove,
  isRemovalEnabled,

}) => {
  const mainAccount = subUsers.find((subUser) => subUser.email === email)
  const subUsersWithoutMainAccount = subUsers.filter((subUser) => subUser.email !== email)
  const usersList = [mainAccount, ...subUsersWithoutMainAccount]

  return (
    <div className='sub-users-list'>
      {usersList.map((account) => {
        const { email: accountEmail } = account
        const isBeingRemoved = subUsersToRemove.includes(accountEmail)
        const classes = classNames('sub-users-list-item', { 'sub-users-list-item--removing': isBeingRemoved })

        return (
          <div className={classes} key={accountEmail}>
            <div className='sub-users-list-item-user'>{accountEmail}</div>
            {isRemovalEnabled && email !== accountEmail && (
              <Icon.BIN
                className='sub-users-list-item-icon'
                onClick={() => onToggle(accountEmail)}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

SubUsersList.propTypes = {
  email: PropTypes.string.isRequired,
  isRemovalEnabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onToggle: PropTypes.func,
  subUsers: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
  })).isRequired,
  subUsersToRemove: PropTypes.arrayOf(PropTypes.string),
}

SubUsersList.defaultProps = {
  onToggle: () => {},
  subUsersToRemove: [],
  isRemovalEnabled: true,
}

export default SubUsersList
