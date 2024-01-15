import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

const BFX_STATUS_LINK = 'https://bitfinex.statuspage.io/'

const MaintenanceDialog = ({
  t,
  isOpen,
  isDisabled,
  errorMessage,
  toggleDialog,
  disableDialog,
}) => {
  const [isDialogDisabled, setIsDialogDisabled] = useState(isDisabled)


  const handleClose = () => {
    toggleDialog(false)
    disableDialog(isDialogDisabled)
  }

  const handleChange = (e) => {
    const { checked } = e.target
    setIsDialogDisabled(checked)
  }

  return (
    <Dialog
      className='error-dialog'
      icon={<Icon.INFO_CIRCLE />}
      onClose={handleClose}
      title={t('framework.warning')}
      isCloseButtonShown={false}
      isOpen={isOpen}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='error-dialog-message'>
          {errorMessage}
        </div>
        <Checkbox
          checked={isDialogDisabled}
          onChange={handleChange}
          label={t('framework.notagain')}
          className='error-dialog-checkbox'
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.PRIMARY} onClick={handleClose}>
            {t('framework.continue')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

MaintenanceDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  disableDialog: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
}

MaintenanceDialog.defaultProps = {
  errorMessage: 'Something went wrong',
}

export default memo(MaintenanceDialog)
