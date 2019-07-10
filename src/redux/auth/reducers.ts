import { Reducer, handleActions } from 'redux-actions'

import { storeOptions } from './actions'
import {
  AuthActionTypes,
  AuthPayloads,
  AuthState,
  GetProfileSucceedPayload,
  GetTokensSucceedPayload,
  LogInStatusType,
  UpdateLoginStatusPayload,
} from './types'

export const INITIAL_STATE: AuthState = {
  loginStatus: LogInStatusType.LOADING,
  tokens: {},
  profile: undefined,
}

export const updateStatus: Reducer<AuthState, UpdateLoginStatusPayload> = (
  state,
  action
) => {
  const { status } = action.payload
  return {
    ...state,
    loginStatus: status,
  }
}

export const updateTokens: Reducer<AuthState, GetTokensSucceedPayload> = (
  state,
  action
) => {
  return {
    ...state,
    tokens: action.payload,
  }
}

export const updateProfile: Reducer<AuthState, GetProfileSucceedPayload> = (
  state,
  action
) => {
  return {
    ...state,
    profile: action.payload,
  }
}

export const authReducer = handleActions<AuthState, AuthPayloads>(
  {
    [AuthActionTypes.CHECK_STATUS_SUCCEED]: updateStatus,
    [AuthActionTypes.GET_TOKENS_SUCCEED]: updateTokens,
    [AuthActionTypes.GET_PROFILE_SUCCEED]: updateProfile,
  },
  INITIAL_STATE,
  storeOptions
)
