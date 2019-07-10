import { createActions } from 'redux-actions'

import { AccountTypes } from './types'

export const storeOptions = {
  prefix: 'ACCOUNT',
}

export const accountActionCreators = createActions(
  {
    [AccountTypes.FETCH_PROFILE_REQUEST]: puaId => ({ puaId }),
    [AccountTypes.FETCH_PROFILE_SUCCEED]: author => author,
    [AccountTypes.FETCH_PROFILE_FAIL]: error => error,
    [AccountTypes.FETCH_PROFILE_FOLLOWERS_REQUEST]: puaId => ({
      puaId,
    }),
    [AccountTypes.FETCH_PROFILE_FOLLOWERS_SUCCEED]: followers => followers,
    [AccountTypes.FETCH_PROFILE_FOLLOWERS_FAIL]: error => error,
    [AccountTypes.FETCH_PROFILE_FOLLOWINGS_REQUEST]: puaId => ({
      puaId,
    }),
    [AccountTypes.FETCH_PROFILE_FOLLOWINGS_SUCCEED]: followings => followings,
    [AccountTypes.FETCH_PROFILE_FOLLOWINGS_FAIL]: error => error,
    [AccountTypes.RESET_FOLLOWERS_FOLLOWINGS]: undefined,
    [AccountTypes.FETCH_STORY_LIST_REQUEST]: accountId => ({ accountId }),
    [AccountTypes.FETCH_NEXT_STORY_LIST_REQUEST]: (accountId, pageToken) => ({
      accountId,
      pageToken,
    }),
    [AccountTypes.FETCH_STORY_LIST_SUCCEED]: (stories, pagination) => ({
      stories,
      pagination,
    }),
    [AccountTypes.FETCH_STORY_LIST_FAIL]: error => error,
    [AccountTypes.FETCH_CUSTOM_STORY_LIST_REQUEST]: listId => ({
      listId,
    }),
    [AccountTypes.FETCH_CUSTOM_STORY_LIST_SUCCEED]: stories => ({ stories }),
    [AccountTypes.FETCH_CUSTOM_STORY_LIST_FAIL]: error => error,
    [AccountTypes.UPDATE_PROFILE_FOLLOWER_COUNT]: value => ({ value }),
    [AccountTypes.UPDATE_PROFILE_FOLLOWING_COUNT]: value => ({ value }),
  },
  storeOptions
)

export const getAccountAction = (type: AccountTypes) =>
  `${storeOptions.prefix}/${type}`
