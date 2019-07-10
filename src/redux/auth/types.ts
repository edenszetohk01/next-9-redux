import { Action } from 'redux-actions'

export enum LogInStatusType {
  LOADING = 'LOADING',
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

// Describe state shape
export type AuthState = {
  loginStatus: LogInStatusType
  tokens: {
    comment?: string
    pua?: string
  }
  profile?: Profile
}

type Profile = {
  puaId: string
  avatar: string
}

// List of actions available
export enum AuthActionTypes {
  AUTH_SUCCEED = 'AUTH_SUCCEED',
  DISPATCH_ACTION_WHEN_AUTH_SUCCEED = 'DISPATCH_ACTION_WHEN_AUTH_SUCCEED',
  CANCEL_DISPATCH_ACTION_WHEN_AUTH_SUCCEED = 'CANCEL_DISPATCH_ACTION_WHEN_AUTH_SUCCEED',
  CALLBACK_WHEN_AUTH_SUCCEED = 'CALLBACK_WHEN_AUTH_SUCCEED',
  CANCEL_CALLBACK_WHEN_AUTH_SUCCEED = ' CANCEL_CALLBACK_WHEN_AUTH_SUCCEED',
  CHECK_STATUS_SUCCEED = 'CHECK_STATUS_SUCCEED',
  GET_TOKENS_SUCCEED = 'GET_TOKENS_SUCCEED',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  GET_PROFILE_SUCCEED = 'GET_PROFILE_SUCCEED',
}

export type UpdateLoginStatusPayload = {
  status: LogInStatusType
}

export type LoginPayload = {
  redirectUrl?: string
}

export type GetTokensSucceedPayload = {
  comment: string
  pua: string
}

export type GetProfileSucceedPayload = {
  puaId: string
  avatar: string
}

export type DispatchActionWhenAuthSucceedPayload = {
  actionType: string
  payload: object
}

export type CallbackWhenAuthSucceedPayload = {
  callback: (status: LogInStatusType, profile?: Profile) => void
}

export type AuthPayloads =
  | UpdateLoginStatusPayload
  | LoginPayload
  | GetTokensSucceedPayload
  | GetProfileSucceedPayload

export type AuthActions = Action<AuthPayloads>
