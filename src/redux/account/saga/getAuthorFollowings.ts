import * as R from 'ramda'
import { Action } from 'redux-actions'
import { call, put, select } from 'redux-saga/effects'
import { followingPaginationSelector } from 'src/redux/account/selectors'
import { myPuaIdSelector } from 'src/redux/auth/selectors'
import { followActionCreators } from 'src/redux/follow'
import { getAppStatusSaga } from 'src/redux/init-services/saga/getAppStatusSaga'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import {
  FetchProfileFollowingsRequestPayload,
  accountActionCreators,
} from '../'

const getAuthorFollowingsSaga = function*(puaId: string) {
  try {
    const followingPagination = yield select(followingPaginationSelector)
    const nextPageToken = R.propOr(null, 'nextPageToken', followingPagination)
    const params = nextPageToken ? { pageToken: nextPageToken } : {}
    const service = yield getServiceSaga(ApiServiceTypes.AUTHOR)
    const data = yield call(service.getAuthorFollowings, puaId, {
      ...params,
      pageSize: 20,
    })
    const myPuaId = yield select(myPuaIdSelector)
    yield put(
      followActionCreators.updateFollowStatuses({
        myPuaId,
        users: data.followings,
      })
    )
    yield put(accountActionCreators.fetchProfileFollowingsSucceed(data))
  } catch (err) {
    console.log(err)
    // Todo: Handle error. Uncomment code below when we have UI for fetch data failure (i.e. retry
    // button to fetch data again when internet disconnects). Want to temporarily show skeleton
    // under no network
    // yield put(accountActionCreators.fetchProfileFollowingsFail(err))
  }
}

export function* getAuthorFollowings(
  action: Action<FetchProfileFollowingsRequestPayload>
) {
  try {
    const { puaId } = action.payload
    yield* getAppStatusSaga()
    yield* getAuthorFollowingsSaga(puaId)
  } catch (err) {
    // TODO: handle error
  }
}
