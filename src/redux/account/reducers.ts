import * as R from 'ramda'
import { Reducer, handleActions } from 'redux-actions'

import { storeOptions } from './actions'
import {
  AccountPayloads,
  AccountState,
  AccountTypes,
  ErrorPayload,
  FetchCustomStoryListRequestPayload,
  FetchCustomStoryListSucceedPayload,
  FetchProfileFollowersRequestPayload,
  FetchProfileFollowersSucceedPayload,
  FetchProfileFollowingsRequestPayload,
  FetchProfileFollowingsSucceedPayload,
  FetchProfileRequestPayload,
  FetchProfileSucceedPayload,
  FetchStoryListRequestPayload,
  FetchStoryListSucceedPayload,
  UpdateProfileFollowerCountPayload,
  UpdateProfileFollowingCountPayload,
} from './types'

const INITIAL_STATE: AccountState = {
  profile: {
    author: undefined,
    isFetching: false,
    error: undefined,
  },
  followers: {
    authors: [],
    pagination: null,
    isFetching: false,
    error: undefined,
  },
  following: {
    authors: [],
    pagination: null,
    isFetching: false,
    error: undefined,
  },
  storyList: {
    list: [],
    pagination: null,
    isFetching: false,
    error: undefined,
  },
}

const fetchProfileRequest: Reducer<AccountState, FetchProfileRequestPayload> = (
  state,
  action
) => {
  const isSameProfile =
    state.profile.author && action.payload.puaId === state.profile.author._id
  return R.mergeDeepLeft(
    {
      profile: {
        ...INITIAL_STATE.profile,
        isFetching: !isSameProfile,
        author: isSameProfile
          ? state.profile.author
          : INITIAL_STATE.profile.author,
      },
    },
    state
  )
}

const fetchProfileSucceed: Reducer<AccountState, FetchProfileSucceedPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      profile: {
        author: R.omit(['isFollowing'], action.payload),
        isFetching: false,
      },
    },
    state
  )

const fetchProfileFail: Reducer<AccountState, ErrorPayload> = (state, action) =>
  R.mergeDeepLeft(
    {
      profile: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

const fetchProfileFollowersRequest: Reducer<
  AccountState,
  FetchProfileFollowersRequestPayload
> = state => R.assocPath(['followers', 'isFetching'], true, state)

const fetchProfileFollowersSucceed: Reducer<
  AccountState,
  FetchProfileFollowersSucceedPayload
> = (state, action) =>
  R.mergeDeepLeft(
    {
      followers: {
        authors: [
          ...state.followers.authors,
          ...R.compose(
            R.map(R.omit(['isFollowing'])),
            R.pathOr([], ['payload', 'followers'])
          )(action),
        ],
        pagination: R.path(['payload', 'pagination'], action),
        isFetching: false,
      },
    },
    state
  )

const fetchProfileFollowersFail: Reducer<AccountState, ErrorPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      followers: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

const fetchProfileFollowingsRequest: Reducer<
  AccountState,
  FetchProfileFollowingsRequestPayload
> = state => R.assocPath(['following', 'isFetching'], true, state)

const fetchProfileFollowingsSucceed: Reducer<
  AccountState,
  FetchProfileFollowingsSucceedPayload
> = (state, action) =>
  R.mergeDeepLeft(
    {
      following: {
        authors: [
          ...state.following.authors,
          ...R.compose(
            R.map(R.omit(['isFollowing'])),
            R.pathOr([], ['payload', 'followings'])
          )(action),
        ],
        pagination: R.path(['payload', 'pagination'], action),
        isFetching: false,
      },
    },
    state
  )

const fetchProfileFollowingsFail: Reducer<AccountState, ErrorPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      following: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

const resetFollowersFollowings: Reducer<AccountState, {}> = state =>
  R.mergeDeepLeft(
    { followers: INITIAL_STATE.followers, following: INITIAL_STATE.following },
    state
  )

const fetchStoryListRequest: Reducer<
  AccountState,
  FetchStoryListRequestPayload
> = state =>
  R.mergeDeepLeft(
    {
      storyList: {
        list: INITIAL_STATE.storyList.list,
        isFetching: true,
        pagination: null,
      },
    },
    state
  )

const fetchNextStoryListRequest: Reducer<
  AccountState,
  FetchStoryListRequestPayload
> = state =>
  R.mergeDeepLeft(
    {
      storyList: {
        isFetching: true,
      },
    },
    state
  )

const fetchStoryListSucceed: Reducer<
  AccountState,
  FetchStoryListSucceedPayload
> = (state, action) =>
  R.mergeDeepLeft(
    {
      storyList: {
        list: R.concat(state.storyList.list, action.payload.stories),
        pagination: action.payload.pagination,
        isFetching: false,
      },
    },
    state
  )

const fetchStoryListFail: Reducer<AccountState, ErrorPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      storyList: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

const fetchCustomStoryListRequest: Reducer<
  AccountState,
  FetchCustomStoryListRequestPayload
> = state =>
  R.mergeDeepLeft(
    {
      storyList: {
        list: INITIAL_STATE.storyList.list,
        pagination: null,
        isFetching: true,
      },
    },
    state
  )

const fetchCustomStoryListSucceed: Reducer<
  AccountState,
  FetchCustomStoryListSucceedPayload
> = (state, action) =>
  R.mergeDeepLeft(
    {
      storyList: {
        list: R.concat(state.storyList.list, action.payload.stories),
        isFetching: false,
      },
    },
    state
  )

const updateProfileFollowerCount: Reducer<
  AccountState,
  UpdateProfileFollowerCountPayload
> = (state, action) =>
  R.evolve(
    {
      profile: {
        author: {
          followerCount: R.add(action.payload.value),
        },
      },
    },
    state
  )

const updateProfileFollowingCount: Reducer<
  AccountState,
  UpdateProfileFollowingCountPayload
> = (state, action) =>
  R.evolve(
    {
      profile: {
        author: {
          followingCount: R.add(action.payload.value),
        },
      },
    },
    state
  )

export const accountReducer = handleActions<AccountState, AccountPayloads>(
  {
    [AccountTypes.FETCH_PROFILE_REQUEST]: fetchProfileRequest,
    [AccountTypes.FETCH_PROFILE_SUCCEED]: fetchProfileSucceed,
    [AccountTypes.FETCH_PROFILE_FAIL]: fetchProfileFail,
    [AccountTypes.FETCH_PROFILE_FOLLOWERS_REQUEST]: fetchProfileFollowersRequest,
    [AccountTypes.FETCH_PROFILE_FOLLOWERS_SUCCEED]: fetchProfileFollowersSucceed,
    [AccountTypes.FETCH_PROFILE_FOLLOWERS_FAIL]: fetchProfileFollowersFail,
    [AccountTypes.FETCH_PROFILE_FOLLOWINGS_REQUEST]: fetchProfileFollowingsRequest,
    [AccountTypes.FETCH_PROFILE_FOLLOWINGS_SUCCEED]: fetchProfileFollowingsSucceed,
    [AccountTypes.FETCH_PROFILE_FOLLOWINGS_FAIL]: fetchProfileFollowingsFail,
    [AccountTypes.RESET_FOLLOWERS_FOLLOWINGS]: resetFollowersFollowings,
    [AccountTypes.FETCH_STORY_LIST_REQUEST]: fetchStoryListRequest,
    [AccountTypes.FETCH_NEXT_STORY_LIST_REQUEST]: fetchNextStoryListRequest,
    [AccountTypes.FETCH_STORY_LIST_SUCCEED]: fetchStoryListSucceed,
    [AccountTypes.FETCH_STORY_LIST_FAIL]: fetchStoryListFail,
    [AccountTypes.FETCH_CUSTOM_STORY_LIST_REQUEST]: fetchCustomStoryListRequest,
    [AccountTypes.FETCH_CUSTOM_STORY_LIST_SUCCEED]: fetchCustomStoryListSucceed,
    [AccountTypes.FETCH_CUSTOM_STORY_LIST_FAIL]: fetchStoryListFail,
    [AccountTypes.UPDATE_PROFILE_FOLLOWER_COUNT]: updateProfileFollowerCount,
    [AccountTypes.UPDATE_PROFILE_FOLLOWING_COUNT]: updateProfileFollowingCount,
  },
  INITIAL_STATE,
  storeOptions
)
