import { all, takeLatest } from 'redux-saga/effects'

import { FollowActionTypes, getFollowAction } from '../'
import { followWorker } from './followWorker'
import { unfollowWorker } from './unfollowWorker'

export function* followWatcher() {
  try {
    yield all([
      takeLatest(
        getFollowAction(FollowActionTypes.FOLLOW_REQUEST),
        followWorker
      ),
      takeLatest(
        getFollowAction(FollowActionTypes.UNFOLLOW_REQUEST),
        unfollowWorker
      ),
    ])
  } catch (e) {
    console.log(e)
  }
}
