import { all, takeLatest } from 'redux-saga/effects'

import { AccountTypes, getAccountAction } from '../'
import { getAuthorFollowers } from './getAuthorFollowers'
import { getAuthorFollowings } from './getAuthorFollowings'
import { getAuthorWorker } from './getAuthorWorker'
import { getCustomStoryListWorker } from './getCustomStoryListWorker'
import { getStoryListWorker } from './getStoryListWorker'
import { updateAuthorWorker } from './updateAuthorWorker'

export function* accountWatcher() {
  try {
    yield all([
      takeLatest(
        getAccountAction(AccountTypes.FETCH_PROFILE_REQUEST),
        getAuthorWorker
      ),
      takeLatest(
        getAccountAction(AccountTypes.UPDATE_PROFILE),
        updateAuthorWorker
      ),
      takeLatest(
        getAccountAction(AccountTypes.FETCH_PROFILE_FOLLOWINGS_REQUEST),
        getAuthorFollowings
      ),
      takeLatest(
        getAccountAction(AccountTypes.FETCH_PROFILE_FOLLOWERS_REQUEST),
        getAuthorFollowers
      ),
      takeLatest(
        getAccountAction(AccountTypes.FETCH_STORY_LIST_REQUEST),
        getStoryListWorker
      ),
      takeLatest(
        getAccountAction(AccountTypes.FETCH_NEXT_STORY_LIST_REQUEST),
        getStoryListWorker
      ),
      takeLatest(
        getAccountAction(AccountTypes.FETCH_CUSTOM_STORY_LIST_REQUEST),
        getCustomStoryListWorker
      ),
    ])
  } catch (e) {
    // TODO: handle error
    console.log(e)
  }
}
