import { Action } from 'redux-actions'
import { Author, ErrorType, FollowAuthor } from 'src/types'

export type UserFollowStatus = {
  [key: string]: {
    isRequesting: boolean // loading state
    isFollowing: boolean
  }
}

// Describe state shape
export type FollowState = {
  users?: UserFollowStatus
  error?: ErrorType
}

// List of actions available
export enum FollowActionTypes {
  FOLLOW_REQUEST = 'FOLLOW_REQUEST',
  FOLLOW_SUCCEED = 'FOLLOW_SUCCEED',
  FOLLOW_FAIL = 'FOLLOW_FAIL',
  UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST',
  UNFOLLOW_SUCCEED = 'UNFOLLOW_SUCCEED',
  UNFOLLOW_FAIL = 'UNFOLLOW_FAIL',
  UPDATE_FOLLOW_STATUS = 'UPDATE_FOLLOW_STATUS',
  UPDATE_FOLLOW_STATUSES = 'UPDATE_FOLLOW_STATUSES',
}

type PuaIdPayload = {
  puaId: string
}
export type FollowRequestPayload = PuaIdPayload & {
  callback?: () => void
}
export type FollowSucceedPayload = PuaIdPayload
export type UnfollowRequestPayload = PuaIdPayload & {
  callback?: () => void
}
export type UnfollowSucceedPayload = PuaIdPayload
export type UserPayload = {
  user: Author
}
export type UsersPayload = {
  myPuaId: string
  users: FollowAuthor[]
}
export type ErrorPayload = PuaIdPayload & {
  error: ErrorType
}

export type FollowPayloads =
  | FollowRequestPayload
  | FollowSucceedPayload
  | UnfollowRequestPayload
  | UnfollowSucceedPayload
  | UserPayload
  | UsersPayload
  | ErrorPayload

export type FollowActions = Action<FollowPayloads>
