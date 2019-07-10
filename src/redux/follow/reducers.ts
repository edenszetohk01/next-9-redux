import * as R from 'ramda'
import { Reducer, handleActions } from 'redux-actions'

import { storeOptions } from './actions'
import {
  ErrorPayload,
  FollowActionTypes,
  FollowPayloads,
  FollowRequestPayload,
  FollowState,
  FollowSucceedPayload,
  UnfollowRequestPayload,
  UnfollowSucceedPayload,
  UserFollowStatus,
  UserPayload,
  UsersPayload,
} from './types'

const INITIAL_STATE: FollowState = {
  users: undefined,
  error: undefined,
}

const followProfileRequest: Reducer<FollowState, FollowRequestPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        [action.payload.puaId]: {
          isRequesting: true,
        },
      },
    },
    state
  )

const followProfileSucceed: Reducer<FollowState, FollowSucceedPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        [action.payload.puaId]: {
          isRequesting: false,
          isFollowing: true,
        },
      },
    },
    state
  )

const followProfileFail: Reducer<FollowState, ErrorPayload> = (state, action) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        [action.payload.puaId]: {
          isRequesting: false,
        },
      },
      error: action.payload.error,
    },
    state
  )

const unfollowProfileRequest: Reducer<FollowState, UnfollowRequestPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        [action.payload.puaId]: {
          isRequesting: true,
        },
      },
    },
    state
  )

const unfollowProfileSucceed: Reducer<FollowState, UnfollowSucceedPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        [action.payload.puaId]: {
          isRequesting: false,
          isFollowing: false,
        },
      },
    },
    state
  )

const unfollowProfileFail: Reducer<FollowState, ErrorPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        [action.payload.puaId]: {
          isRequesting: false,
        },
      },
      error: action.payload.error,
    },
    state
  )

const updateFollowStatus: Reducer<FollowState, UserPayload> = (state, action) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        [action.payload.user._id]: {
          isRequesting: false,
          isFollowing: R.propOr(false, 'isFollowing', action.payload.user),
        },
      },
    },
    state
  )

const updateFollowStatuses: Reducer<FollowState, UsersPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      users: {
        ...state.users,
        ...R.reduce(
          (acc: UserFollowStatus, obj) => {
            if (action.payload.myPuaId !== obj._id) {
              acc[obj._id] = {
                isRequesting: false,
                isFollowing: R.propOr(false, 'isFollowing', obj),
              }
            }
            return acc
          },
          {},
          action.payload.users
        ),
      },
    },
    state
  )

export const followReducer = handleActions<FollowState, FollowPayloads>(
  {
    [FollowActionTypes.FOLLOW_REQUEST]: followProfileRequest,
    [FollowActionTypes.FOLLOW_SUCCEED]: followProfileSucceed,
    [FollowActionTypes.FOLLOW_FAIL]: followProfileFail,
    [FollowActionTypes.UNFOLLOW_REQUEST]: unfollowProfileRequest,
    [FollowActionTypes.UNFOLLOW_SUCCEED]: unfollowProfileSucceed,
    [FollowActionTypes.UNFOLLOW_FAIL]: unfollowProfileFail,
    [FollowActionTypes.UPDATE_FOLLOW_STATUS]: updateFollowStatus,
    [FollowActionTypes.UPDATE_FOLLOW_STATUSES]: updateFollowStatuses,
  },
  INITIAL_STATE,
  storeOptions
)
