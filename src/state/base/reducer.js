import { getDefaultTableScrollSetting } from 'state/utils'

import types from './constants'

const initialState = {
  dateFormat: types.DATE_FORMATS[0],
  locale: 'en',
  theme: types.DEFAULT_THEME,
  timezone: types.DEFAULT_TIMEZONE,
  milliseconds: false,
  src: types.DEFAULT_SRC,
  customApiPort: null,
  tableScroll: getDefaultTableScrollSetting(),
  showMaintenanceModal: false,
}

export function baseReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_LANG:
      return {
        ...state,
        locale: payload || 'en',
      }
    case types.SET_THEME:
      return {
        ...state,
        theme: payload,
      }
    case types.SET_TIMEZONE:
      return {
        ...state,
        timezone: payload,
      }
    case types.SET_DATE_FORMAT:
      return {
        ...state,
        dateFormat: payload,
      }
    case types.SET_SRC:
      return {
        ...state,
        src: payload,
      }
    case types.SET_CUSTOM_API_PORT:
      return {
        ...state,
        customApiPort: payload,
      }
    case types.SHOW_MILLISECONDS:
      return {
        ...state,
        milliseconds: payload,
      }
    case types.SHOW_MAINTENANCE_MODAL:
      return {
        ...state,
        showMaintenanceModal: payload,
      }
    case types.TOGGLE_TABLE_SCROLL:
      return {
        ...state,
        tableScroll: !state.tableScroll,
      }
    default:
      return state
  }
}

export default baseReducer
