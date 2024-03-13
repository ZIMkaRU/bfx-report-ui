import types from './constants'

/**
 * Create an action to toggle electron backend loaded event.
 */
export function electronBackendLoaded() {
  return {
    type: types.ELECTRON_BACKEND_LOADED,
  }
}

/**
 * Create an action to show/hide export dialog.
 */
export function toggleExportDialog() {
  return {
    type: types.TOGGLE_EXPORT_DIALOG,
  }
}

/**
 * Create an action to show/hide export success dialog.
 */
export function toggleExportSuccessDialog() {
  return {
    type: types.TOGGLE_EXPORT_SUCCESS_DIALOG,
  }
}

/**
 * Create an action to show/hide error dialog.
 * @param {boolean} isErrorDialogOpen dialog state
 * @param {string} errorMessage error message
 */
export function toggleErrorDialog(isErrorDialogOpen, errorMessage) {
  return {
    type: types.TOGGLE_ERROR_DIALOG,
    payload: {
      isErrorDialogOpen,
      errorMessage,
    },
  }
}

/**
 * Create an action to disable error dialog.
 * @param {boolean} isErrorDialogDisabled dialog state
 */
export function disableErrorDialog(isErrorDialogDisabled) {
  return {
    type: types.DISABLE_ERROR_DIALOG,
    payload: isErrorDialogDisabled,
  }
}

/**
 * Create an action to toggle pagination dialog.
 * @param {boolean} isOpen dialog state
 * @param {number} latestPaginationTimestamp timestamp of the last checked entry (nextPage value)
 */
export function togglePaginationDialog(isOpen, latestPaginationTimestamp) {
  return {
    type: types.TOGGLE_PAGINATION_DIALOG,
    payload: {
      isOpen,
      latestPaginationTimestamp,
    },
  }
}

/**
 * Create an action to show/hide preferences dialog.
 */
export function togglePreferencesDialog() {
  return {
    type: types.TOGGLE_PREFERENCES_DIALOG,
  }
}

/**
 * Create an action to show/hide timeframe dialog.
 */
export function toggleTimeFrameDialog() {
  return {
    type: types.TOGGLE_TIMEFRAME_DIALOG,
  }
}

/**
 * Create an action to show/hide go to range dialog.
 */
export function toggleGoToRangeDialog() {
  return {
    type: types.TOGGLE_GO_TO_RANGE_DIALOG,
  }
}

/**
 * Create an action to proceed with pagination request.
 * @param {boolean} payload indicator of whether pagination request should proceed
 */
export function proceedPaginationRequest(payload) {
  return {
    type: types.PROCEED_PAGINATION_REQUEST,
    payload,
  }
}

/**
 * Create an action to handle document loaded event.
 */
export function uiLoaded() {
  return {
    type: types.UI_LOADED,
  }
}

/**
 * Create an action to handle document resize event.
 */
export function uiResized() {
  return {
    type: types.UI_RESIZED,
  }
}

export function toggleNavigationDrawer() {
  return {
    type: types.TOGGLE_NAVIGATION_DRAWER,
  }
}

export function toggleExtraInfoDialog() {
  return {
    type: types.TOGGLE_EXTRA_INFO_DIALOG,
  }
}

export function showMaintenanceModal(status) {
  return {
    type: types.SHOW_MAINTENANCE_MODAL,
    payload: status,
  }
}

export function toggleExportFailDialog() {
  return {
    type: types.TOGGLE_EXPORT_FAIL_DIALOG,
  }
}

export default {
  electronBackendLoaded,
  disableErrorDialog,
  toggleErrorDialog,
  toggleExportDialog,
  toggleExportSuccessDialog,
  togglePaginationDialog,
  togglePreferencesDialog,
  toggleTimeFrameDialog,
  toggleGoToRangeDialog,
  toggleNavigationDrawer,
  proceedPaginationRequest,
  toggleExtraInfoDialog,
  showMaintenanceModal,
  toggleExportFailDialog,
}
