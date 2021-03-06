import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import mode from 'state/sync/constants'

import { propTypes, defaultProps } from './FrameworkDialog.props'

class FrameworkDialog extends PureComponent {
  state = {
    isFrameworkDialogDisabled: false,
  }

  componentDidUpdate(prevProps) {
    const { isFrameworkOpen, syncMode } = this.props
    if (isFrameworkOpen && prevProps.syncMode !== mode.MODE_OFFLINE && syncMode === mode.MODE_OFFLINE) {
      this.handleProceed(true)
    }
  }

  handleProceed = (shouldProceed) => {
    const { toggleDialog, proceedRequest } = this.props
    const { isFrameworkDialogDisabled } = this.state

    const options = {
      shouldProceed,
      isFrameworkDialogDisabled,
    }
    proceedRequest(options)
    toggleDialog()
  }

  handleChange = (e) => {
    const { checked } = e.target
    this.setState({
      isFrameworkDialogDisabled: checked,
    })
  }

  render() {
    const { isFrameworkOpen, syncMode, t } = this.props
    const { isFrameworkDialogDisabled } = this.state
    if (!isFrameworkOpen) {
      return null
    }

    const title = (syncMode === mode.MODE_SYNCING)
      ? t('framework.title')
      : t('framework.no_sync')

    return (
      <Dialog
        icon={IconNames.CONFIRM}
        onClose={() => this.handleProceed(false)}
        title={title}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isFrameworkOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <Checkbox
            checked={isFrameworkDialogDisabled}
            onChange={this.handleChange}
            label={t('framework.notagain')}
            className='bitfinex-framework-checkbox'
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => this.handleProceed(false)}>
              {t('framework.cancel')}
            </Button>
            <Button intent={Intent.PRIMARY} onClick={() => this.handleProceed(true)}>
              {t('framework.proceed')}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

FrameworkDialog.propTypes = propTypes
FrameworkDialog.defaultProps = defaultProps

export default withTranslation('translations')(FrameworkDialog)
