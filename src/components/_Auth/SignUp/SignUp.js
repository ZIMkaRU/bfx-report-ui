import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Button,
  Callout,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import Icon from 'icons'
import PlatformLogo from 'ui/PlatformLogo'
import config from 'config'

import { propTypes, defaultProps } from './SignUp.props'
import InputKey from '../InputKey'
import ErrorLabel from '../ErrorLabel'
import { MODES } from '../Auth'

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z*.!@#$%^&(){}:;<>,?/\\~_+=|\d-]{8,}$/

// handles framework sign up and online version login
class SignUp extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super()

    const { authData: { apiKey, apiSecret, isPersisted } } = props
    this.state = {
      apiKey,
      apiSecret,
      password: '',
      passwordRepeat: '',
      isBeingValidated: false,
      isPasswordProtected: false,
      isPersisted,
      passwordError: '',
      passwordRepeatError: '',
    }
  }

  onSignUp = () => {
    const { signUp } = this.props
    const {
      apiKey,
      apiSecret,
      password,
      isPasswordProtected,
      isPersisted,
    } = this.state
    this.setState({
      isBeingValidated: true,
    })
    const isValid = this.validateForm()

    if (isValid) {
      signUp({
        apiKey,
        apiSecret,
        password,
        isNotProtected: !isPasswordProtected,
        isPersisted,
      })
    }
  }

  validateForm = () => {
    const {
      password,
      passwordRepeat,
      isPasswordProtected,
      passwordError,
      passwordRepeatError,
    } = this.state

    if (!config.showFrameworkMode || !isPasswordProtected) {
      return true
    }

    let isValid = true
    const isValidPassword = passwordRegExp.test(password)

    if (password.length < 8) {
      this.setState({ passwordError: 'auth.passwordLengthValidationError' })
      isValid = false
    } else if (!isValidPassword) {
      this.setState({ passwordError: 'auth.passwordCharactersValidationError' })
      isValid = false
    } else if (passwordError) {
      this.setState({ passwordError: '' })
    }

    // don't start validating password repeat if password is invalid yet
    if (!isValid && !passwordRepeatError) {
      return isValid
    }

    if (password !== passwordRepeat) {
      this.setState({ passwordRepeatError: 'auth.passwordRepeatValidationError' })
      isValid = false
    } else if (passwordRepeatError) {
      this.setState({ passwordRepeatError: '' })
    }

    return isValid
  }

  handleInputChange = (e) => {
    const { isBeingValidated } = this.state
    const { name, value } = e.target
    this.setState({
      [name]: value,
    }, () => isBeingValidated && this.validateForm())
  }

  handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    this.setState({
      [name]: checked,
    })
  }

  render() {
    const {
      loading,
      switchMode,
      t,
      users,
    } = this.props
    const {
      apiKey,
      apiSecret,
      password,
      passwordRepeat,
      isPasswordProtected,
      isPersisted,
      passwordError,
      passwordRepeatError,
    } = this.state

    const title = config.showFrameworkMode ? t('auth.signUp') : t('auth.title')
    const icon = config.showFrameworkMode ? <Icon.SIGN_UP /> : <Icon.SIGN_IN />
    const isSignUpDisabled = !apiKey || !apiSecret
      || (config.showFrameworkMode && isPasswordProtected
        && (!password || !passwordRepeat || passwordError || passwordRepeatError))

    const classes = classNames('bitfinex-auth', 'bitfinex-auth-sign-up', {
      'bitfinex-auth-sign-up--framework': config.showFrameworkMode,
    })

    return (
      <Dialog
        className={classes}
        title={title}
        isOpen
        icon={icon}
        isCloseButtonShown={false}
        usePortal={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <PlatformLogo />
          <Callout>
            {t('auth.note1')}
            <a href={config.KEY_URL} target='_blank' rel='noopener noreferrer'>
              {config.KEY_URL.split('https://')[1]}
            </a>
            {t('auth.note2')}
          </Callout>
          <InputKey
            label='auth.enterAPIKey'
            name='apiKey'
            value={apiKey}
            onChange={this.handleInputChange}
          />
          <InputKey
            label='auth.enterAPISecret'
            name='apiSecret'
            value={apiSecret}
            onChange={this.handleInputChange}
          />
          {config.showFrameworkMode && isPasswordProtected && (
            <Fragment>
              <InputKey
                label='auth.enterPassword'
                name='password'
                value={password}
                onChange={this.handleInputChange}
              />
              <ErrorLabel text={passwordError} />
              <InputKey
                label='auth.repeatPassword'
                name='passwordRepeat'
                value={passwordRepeat}
                onChange={this.handleInputChange}
              />
              <ErrorLabel text={passwordRepeatError} />
            </Fragment>
          )}
          <div className='bitfinex-auth-checkboxes'>
            <Checkbox
              className='bitfinex-auth-remember-me'
              name='isPersisted'
              checked={isPersisted}
              onChange={this.handleCheckboxChange}
            >
              {t('auth.rememberMe')}
            </Checkbox>
            {config.showFrameworkMode && (
              <Checkbox
                className='bitfinex-auth-remember-me'
                name='isPasswordProtected'
                checked={isPasswordProtected}
                onChange={this.handleCheckboxChange}
              >
                {t('auth.passwordProtection')}
              </Checkbox>
            )}
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {config.showFrameworkMode && users.length > 0 && (
              <div className='bitfinex-auth-mode-switch' onClick={() => switchMode(MODES.SIGN_IN)}>
                {t('auth.signIn')}
              </div>
            )}
            <Button
              className='bitfinex-auth-check'
              name='check'
              intent={Intent.SUCCESS}
              onClick={this.onSignUp}
              disabled={isSignUpDisabled}
              loading={loading}
            >
              {title}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withTranslation('translations')(SignUp)
