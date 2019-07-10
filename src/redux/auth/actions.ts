import { createActions } from 'redux-actions'

import { AuthActionTypes } from './types'

export const storeOptions = {
  prefix: 'AUTH',
}

export const authActionCreators = createActions(
  {
    [AuthActionTypes.CHECK_STATUS_SUCCEED]: status => ({ status }),
    [AuthActionTypes.AUTH_SUCCEED]: (status, profile) => ({ status, profile }),
    [AuthActionTypes.DISPATCH_ACTION_WHEN_AUTH_SUCCEED]: (
      actionType,
      payload
    ) => ({
      actionType,
      payload,
    }),
    [AuthActionTypes.CANCEL_DISPATCH_ACTION_WHEN_AUTH_SUCCEED]: undefined,
    [AuthActionTypes.CALLBACK_WHEN_AUTH_SUCCEED]: callback => ({
      callback,
    }),
    [AuthActionTypes.CANCEL_CALLBACK_WHEN_AUTH_SUCCEED]: undefined,
    [AuthActionTypes.GET_TOKENS_SUCCEED]: (comment, pua) => ({
      comment,
      pua,
    }),
    [AuthActionTypes.LOGIN]: redirectUrl => ({ redirectUrl }),
    [AuthActionTypes.LOGOUT]: undefined,
    [AuthActionTypes.GET_PROFILE_SUCCEED]: (puaId, avatar) => ({
      puaId,
      avatar,
    }),
  },
  storeOptions
)

export const getAuthAction = (type: AuthActionTypes) =>
  `${storeOptions.prefix}/${type}`
