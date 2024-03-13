import getDeviceType from 'utils/getDeviceType'

import types from './constants'

const initialState = {
  isElectronBackendLoaded: false,
  isExportDialogOpen: false,
  isErrorDialogDisabled: false,
  isErrorDialogOpen: false,
  isExportSuccessDialogOpen: true,
  isExportFailDialogOpen: false,
  isPaginationDialogOpen: false,
  isPreferencesDialogOpen: false,
  isTimeFrameDialogOpen: false,
  isGoToRangeDialogOpen: false,
  isNavigationDrawerOpen: false,
  isExtraInfoDialogOpen: false,
  showMaintenanceModal: false,
  latestPaginationTimestamp: undefined,
  errorMessage: undefined,
  device: getDeviceType(),
  windowWidth: window.innerWidth,
}

export function uiReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.ELECTRON_BACKEND_LOADED:
      return {
        ...state,
        isElectronBackendLoaded: true,
      }
    case types.TOGGLE_ERROR_DIALOG: {
      const { isErrorDialogOpen, errorMessage } = payload

      return {
        ...state,
        isErrorDialogOpen,
        errorMessage,
      }
    }
    case types.DISABLE_ERROR_DIALOG: {
      return {
        ...state,
        isErrorDialogDisabled: payload,
      }
    }
    case types.TOGGLE_EXPORT_DIALOG:
      return {
        ...state,
        isExportDialogOpen: !state.isExportDialogOpen,
      }
    case types.TOGGLE_EXPORT_SUCCESS_DIALOG:
      return {
        ...state,
        isExportSuccessDialogOpen: !state.isExportSuccessDialogOpen,
      }
    case types.TOGGLE_EXPORT_FAIL_DIALOG:
      return {
        ...state,
        isExportFailDialogOpen: !state.isExportFailDialogOpen,
      }
    case types.TOGGLE_PAGINATION_DIALOG: {
      const { isOpen, latestPaginationTimestamp } = payload

      return {
        ...state,
        isPaginationDialogOpen: isOpen,
        latestPaginationTimestamp,
      }
    }
    case types.TOGGLE_PREFERENCES_DIALOG: {
      return {
        ...state,
        isPreferencesDialogOpen: !state.isPreferencesDialogOpen,
      }
    }
    case types.TOGGLE_TIMEFRAME_DIALOG: {
      return {
        ...state,
        isTimeFrameDialogOpen: !state.isTimeFrameDialogOpen,
      }
    }
    case types.TOGGLE_GO_TO_RANGE_DIALOG: {
      return {
        ...state,
        isGoToRangeDialogOpen: !state.isGoToRangeDialogOpen,
      }
    }
    case types.TOGGLE_NAVIGATION_DRAWER: {
      return {
        ...state,
        isNavigationDrawerOpen: !state.isNavigationDrawerOpen,
      }
    }
    case types.TOGGLE_EXTRA_INFO_DIALOG: {
      return {
        ...state,
        isExtraInfoDialogOpen: !state.isExtraInfoDialogOpen,
      }
    }
    case types.SHOW_MAINTENANCE_MODAL:
      return {
        ...state,
        showMaintenanceModal: payload,
      }
    case types.UI_RESIZED:
      return {
        ...state,
        device: getDeviceType(),
        windowWidth: window.innerWidth,
      }
    default: {
      return state
    }
  }
}

export default uiReducer
