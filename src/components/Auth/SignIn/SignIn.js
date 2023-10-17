import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _filter from 'lodash/filter'
import _isEqual from 'lodash/isEqual'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import config from 'config'
import PlatformLogo from 'ui/PlatformLogo'

import { AUTH_TYPES, MODES } from '../Auth'
import LoginOtp from '../LoginOtp'
import InputKey from '../InputKey'
import SignInList from '../SignInList'
import DeleteAccount from '../DeleteAccount'

import SelectedUserItem from './SignIn.item'

const { isElectronApp } = config
const getPreparedUsers = (users, multi = false) => (multi
  ? _filter(users, 'isSubAccount').map(user => user.email)
  : _filter(users, ['isSubAccount', false]).map(user => user.email))

class SignIn extends PureComponent {
  static propTypes = {
    authData: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      isPersisted: PropTypes.bool,
      isSubAccount: PropTypes.bool,
    }).isRequired,
    isMultipleAccsSelected: PropTypes.bool.isRequired,
    isElectronBackendLoaded: PropTypes.bool.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isUsersLoaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    signInOtp: PropTypes.func.isRequired,
    switchMode: PropTypes.func.isRequired,
    signUpEmail: PropTypes.func.isRequired,
    showOtpLogin: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    isOtpLoginShown: PropTypes.bool.isRequired,
    switchAuthType: PropTypes.func.isRequired,
    setMasterAccount: PropTypes.func.isRequired,
    setLocalUsername: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    updateAuth: PropTypes.func.isRequired,
    userShouldReLogin: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubAccount: PropTypes.bool.isRequired,
      isNotProtected: PropTypes.bool.isRequired,
    })).isRequired,
  }

  constructor(props) {
    super()

    const { authData: { email, password }, users, isMultipleAccsSelected } = props
    const { email: firstUserEmail } = users[0] || {}
    const multiAccsUsers = getPreparedUsers(users, isMultipleAccsSelected)
    const multiAccsEmail = multiAccsUsers[0]
    const initialEmail = isMultipleAccsSelected
      ? multiAccsEmail || ''
      : email || firstUserEmail
    this.state = {
      email: initialEmail,
      password,
      userPassword: '',
      showUsersList: true,
      isSubAccount: false,
      showDeleteAccount: false,
    }
  }

  componentDidMount() {
    this.handleSubAccounts()
  }

  componentDidUpdate(prevProps) {
    const {
      users,
      switchMode,
      isUsersLoaded,
      authData: { email },
    } = this.props

    if (!prevProps.isUsersLoaded && isUsersLoaded) {
      if (users.length) {
        const { email: firstUserEmail } = users[0] || {}
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          email: email || firstUserEmail,
        })
      } else {
        switchMode(MODES.SIGN_UP)
      }
    }

    this.handleSubAccounts()
  }

  onSignIn = () => {
    const {
      signIn, userShouldReLogin, signUpEmail,
    } = this.props
    const {
      email, password, userPassword, isSubAccount,
    } = this.state
    if (_isEqual(email, userShouldReLogin)) {
      signUpEmail({
        login: email,
        password: userPassword,
      })
    } else {
      signIn({
        email,
        isNotProtected: !password,
        isSubAccount,
        password,
      })
    }
  }

  togglePersistence = () => {
    const { authData: { isPersisted }, updateAuth } = this.props
    updateAuth({ isPersisted: !isPersisted })
  }

  handleSubAccounts = () => {
    const {
      isSubAccount, updateAuth, isMultipleAccsSelected,
    } = this.props
    if (isMultipleAccsSelected && !isSubAccount) updateAuth({ isSubAccount: true })
    if (!isMultipleAccsSelected && isSubAccount) updateAuth({ isSubAccount: false })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handle2FACancel = () => {
    const { showOtpLogin } = this.props
    this.setState({ otp: '' })
    showOtpLogin(false)
  }

  handle2FASignIn = () => {
    const { signInOtp } = this.props
    const {
      otp, password, email,
    } = this.state
    signInOtp({
      otp,
      email,
      password,
      isSubAccount: false,
      isNotProtected: !password,
    })
  }

  handleUserItemSelect = ({ email, isSubAccount }) => {
    const { switchAuthType } = this.props
    if (isSubAccount) {
      switchAuthType(AUTH_TYPES.MULTIPLE_ACCOUNTS)
    } else {
      switchAuthType(AUTH_TYPES.SIMPLE_ACCOUNTS)
    }
    this.setState({
      email,
      password: '',
      isSubAccount,
      showUsersList: false,
    })
  }

  backToUsersList = () => {
    const { switchAuthType } = this.props
    switchAuthType(AUTH_TYPES.SIMPLE_ACCOUNTS)
    this.setState({
      email: '',
      password: '',
      isSubAccount: false,
      showUsersList: true,
      showDeleteAccount: false,
    })
  }

  handleAddAccountToSelectedUser = (email, localUsername) => {
    const {
      switchMode, switchAuthType, setMasterAccount, setLocalUsername,
    } = this.props
    switchAuthType(AUTH_TYPES.MULTIPLE_ACCOUNTS)
    switchMode(MODES.SIGN_UP)
    setMasterAccount(email)
    setLocalUsername(localUsername)
  }

  handleDeleteUser = (user) => {
    const { deleteAccount } = this.props
    const { isNotProtected, email, isSubAccount } = user
    if (isNotProtected) {
      deleteAccount(user)
    } else {
      this.setState({
        email,
        isSubAccount,
        showUsersList: false,
        showDeleteAccount: true,
      })
    }
  }

  deleteProtectedAccount = () => {
    const { email, password, isSubAccount } = this.state
    const { deleteAccount } = this.props
    deleteAccount({
      email,
      password,
      isSubAccount,
      isNotProtected: !password,
    })
    this.backToUsersList()
  }

  render() {
    const {
      t,
      users,
      loading,
      switchMode,
      isSubAccount,
      deleteAccount,
      isOtpLoginShown,
      userShouldReLogin,
      isElectronBackendLoaded,
    } = this.props
    const {
      otp,
      email,
      password,
      userPassword,
      showUsersList,
      showDeleteAccount,
    } = this.state

    const { isNotProtected } = users.find(user => user.email === email && user.isSubAccount === isSubAccount) || {}
    const isSignInDisabled = !email || (isElectronApp && !isElectronBackendLoaded)
      || (!isNotProtected && !password)
    const isEmailSelected = !isEmpty(email)
    const isCurrentUserShouldReLogin = isEmailSelected && _isEqual(email, userShouldReLogin) && !showUsersList
    const showSelectedUser = !showUsersList && isEmailSelected && !showDeleteAccount
    const showInputPassword = !isNotProtected && showSelectedUser && users.length > 0
    const showSignInActions = !isOtpLoginShown && !showUsersList

    return (
      <Dialog
        isOpen
        usePortal
        title={t('auth.signIn')}
        isCloseButtonShown={false}
        className='bitfinex-auth bitfinex-auth-sign-in'
      >
        <div className={Classes.DIALOG_BODY}>
          <PlatformLogo />
          {showUsersList && (
            <SignInList
              users={users}
              switchMode={switchMode}
              handleDeleteAccount={this.handleDeleteUser}
              handleUserItemSelect={this.handleUserItemSelect}
              handleAddAccounts={this.handleAddAccountToSelectedUser}
            />
          )}
          {showDeleteAccount && (
            <DeleteAccount
              email={email}
              password={password}
              onChange={this.handleInputChange}
              handleDeleteAccount={deleteAccount}
              backToUsersList={this.backToUsersList}
            />
          )}
          {isOtpLoginShown
            ? (
              <div className='sign-in-wrapper'>
                <LoginOtp
                  otp={otp}
                  handle2FACancel={this.handle2FACancel}
                  handleInputChange={this.handleInputChange}
                  handleOneTimePassword={this.handle2FASignIn}
                />
              </div>
            ) : (
              <div className='sign-in-wrapper'>
                {showSelectedUser && (
                  <SelectedUserItem
                    user={email}
                    title={'auth.signInTo'}
                    backToUsersList={this.backToUsersList}
                  />
                )}
                {isCurrentUserShouldReLogin && (
                  <InputKey
                    name='userPassword'
                    value={userPassword}
                    onChange={this.handleInputChange}
                    label='auth.loginEmail.bfxAccPassword'
                  />
                )}
                {showInputPassword && (
                  <InputKey
                    name='password'
                    value={password}
                    label='auth.enterPassword'
                    onChange={this.handleInputChange}
                  />
                )}
                {showSignInActions && (
                  <div
                    className='bitfinex-auth-password-recovery'
                    onClick={() => switchMode(MODES.PASSWORD_RECOVERY)}
                  >
                    {t('auth.forgotPasswordLink')}
                  </div>
                )}
              </div>
            )}
        </div>
        {showSignInActions && (
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <div>
                <Button
                  name='check'
                  loading={loading}
                  intent={Intent.SUCCESS}
                  disabled={isSignInDisabled}
                  className='bitfinex-auth-check'
                  onClick={showDeleteAccount
                    ? this.deleteProtectedAccount
                    : this.onSignIn}
                >
                  {showDeleteAccount
                    ? t('auth.removeAccount')
                    : t('auth.signIn')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    )
  }
}

export default SignIn
