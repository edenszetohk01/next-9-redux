import { Action } from 'redux-actions'
import { Author, ErrorType, FollowAuthor, Pagination, Story } from 'src/types'

// Describe state shape
export type AccountState = {
  profile: {
    author?: Exclude<Author, 'isFollowing'>
    isFetching: boolean
    error?: ErrorType
  }
  followers: {
    authors: (Exclude<FollowAuthor, 'isFollowing'>)[]
    pagination: Pagination | null
    isFetching: boolean
    error?: ErrorType
  }
  following: {
    authors: (Exclude<FollowAuthor, 'isFollowing'>)[]
    pagination: Pagination | null
    isFetching: boolean
    error?: ErrorType
  }
  storyList: {
    list: Story[]
    pagination: Pagination | null
    isFetching: boolean
    error?: ErrorType
  }
}

// List of actions available
export enum AccountTypes {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCEED = 'FETCH_PROFILE_SUCCEED',
  FETCH_PROFILE_FAIL = 'FETCH_PROFILE_FAIL',
  FETCH_PROFILE_FOLLOWERS_REQUEST = 'FETCH_PROFILE_FOLLOWERS_REQUEST',
  FETCH_PROFILE_FOLLOWERS_SUCCEED = 'FETCH_PROFILE_FOLLOWERS_SUCCEED',
  FETCH_PROFILE_FOLLOWERS_FAIL = 'FETCH_PROFILE_FOLLOWERS_FAIL',
  FETCH_PROFILE_FOLLOWINGS_REQUEST = 'FETCH_PROFILE_FOLLOWINGS_REQUEST',
  FETCH_PROFILE_FOLLOWINGS_SUCCEED = 'FETCH_PROFILE_FOLLOWINGS_SUCCEED',
  FETCH_PROFILE_FOLLOWINGS_FAIL = 'FETCH_PROFILE_FOLLOWINGS_FAIL',
  RESET_FOLLOWERS_FOLLOWINGS = 'RESET_FOLLOWERS_FOLLOWINGS',
  FETCH_STORY_LIST_REQUEST = 'FETCH_STORY_LIST_REQUEST',
  FETCH_NEXT_STORY_LIST_REQUEST = 'FETCH_NEXT_STORY_LIST_REQUEST',
  FETCH_STORY_LIST_SUCCEED = 'FETCH_STORY_LIST_SUCCEED',
  FETCH_STORY_LIST_FAIL = 'FETCH_STORY_LIST_FAIL',
  FETCH_CUSTOM_STORY_LIST_REQUEST = 'FETCH_CUSTOM_STORY_LIST_REQUEST',
  FETCH_CUSTOM_STORY_LIST_SUCCEED = 'FETCH_CUSTOM_STORY_LIST_SUCCEED',
  FETCH_CUSTOM_STORY_LIST_FAIL = 'FETCH_CUSTOM_STORY_LIST_FAIL',
  UPDATE_PROFILE_FOLLOWER_COUNT = 'UPDATE_PROFILE_FOLLOWER_COUNT',
  UPDATE_PROFILE_FOLLOWING_COUNT = 'UPDATE_PROFILE_FOLLOWING_COUNT',
}

// Describe payload of different actions
type PuaIdPayload = {
  puaId: string
}
export type FetchProfileRequestPayload = PuaIdPayload
export type UpdateProfilePayload = PuaIdPayload & {
  loginStatus: string
}
export type FetchMyProfilePayload = {
  defaultTab: string
  listId?: string
}
export type FetchProfileSucceedPayload = Author
export type FetchProfileFollowersRequestPayload = PuaIdPayload
export type FetchProfileFollowersSucceedPayload = {
  followers: Author[]
  pagination: Pagination
}
export type FetchProfileFollowingsRequestPayload = PuaIdPayload
export type FetchProfileFollowingsSucceedPayload = {
  followings: Author[]
}
export type FetchStoryListRequestPayload = {
  accountId: string
  pageToken?: string
}
export type FetchStoryListSucceedPayload = {
  stories: Story[]
  pagination: Pagination
}

export type FetchCustomStoryListRequestPayload = {
  listId: string
}

export type FetchCustomStoryListSucceedPayload = {
  stories: Story[]
}

type FollowCountPayload = {
  value: number
}
export type UpdateProfileFollowerCountPayload = FollowCountPayload
export type UpdateProfileFollowingCountPayload = FollowCountPayload

export type ErrorPayload = ErrorType

export type AccountPayloads =
  | FetchProfileRequestPayload
  | FetchProfileSucceedPayload
  | FetchProfileFollowersRequestPayload
  | FetchProfileFollowersSucceedPayload
  | FetchProfileFollowingsRequestPayload
  | FetchProfileFollowingsSucceedPayload
  | FetchStoryListRequestPayload
  | FetchStoryListSucceedPayload
  | FetchCustomStoryListRequestPayload
  | FetchCustomStoryListSucceedPayload
  | UpdateProfileFollowerCountPayload
  | UpdateProfileFollowingCountPayload
  | ErrorPayload
export type AccountActions = Action<AccountPayloads>
