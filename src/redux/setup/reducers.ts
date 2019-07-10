import { Reducer, handleActions } from 'redux-actions'

import { storeOptions } from './actions'
import {
  AppStatusChangedPayload,
  AppStatusType,
  SetPathnamePayload,
  SetupActionTypes,
  SetupPayloads,
  SetupState,
} from './types'

const INITIAL_STATE: SetupState = {
  appStatus: AppStatusType.LOADING,
  pathname: '',
}

const updateAppStatus: Reducer<SetupState, AppStatusChangedPayload> = (
  state,
  action
) => {
  return {
    ...state,
    appStatus: action.payload.status,
  }
}

const setPathname: Reducer<SetupState, SetPathnamePayload> = (
  state,
  action
) => {
  return {
    ...state,
    pathname: action.payload.pathname,
  }
}

export const setupReducers = handleActions<SetupState, SetupPayloads>(
  {
    [SetupActionTypes.CHANGE_APP_STATUS]: updateAppStatus,
    [SetupActionTypes.SET_PATHNAME]: setPathname,
  },
  INITIAL_STATE,
  storeOptions
)
