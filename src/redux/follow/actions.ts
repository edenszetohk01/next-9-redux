import { createActions } from 'redux-actions'

import { FollowActionTypes } from './types'

export const storeOptions = {
  prefix: 'FOLLOW',
}

export const followActionCreators = createActions(
  {
    [FollowActionTypes.FOLLOW_REQUEST]: (puaId, callback) => ({
      puaId,
      callback,
    }),
    [FollowActionTypes.FOLLOW_SUCCEED]: puaId => ({ puaId }),
    [FollowActionTypes.FOLLOW_FAIL]: ({ error, puaId }) => ({
      error,
      puaId,
    }),
    [FollowActionTypes.UNFOLLOW_REQUEST]: (puaId, callback) => ({
      puaId,
      callback,
    }),
    [FollowActionTypes.UNFOLLOW_SUCCEED]: puaId => ({ puaId }),
    [FollowActionTypes.UNFOLLOW_FAIL]: ({ error, puaId }) => ({
      error,
      puaId,
    }),
    [FollowActionTypes.UPDATE_FOLLOW_STATUS]: user => ({ user }),
    [FollowActionTypes.UPDATE_FOLLOW_STATUSES]: ({ myPuaId, users }) => ({
      myPuaId,
      users,
    }),
  },
  storeOptions
)

export const getFollowAction = (type: FollowActionTypes) =>
  `${storeOptions.prefix}/${type}`
