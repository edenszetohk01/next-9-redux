import * as R from 'ramda'
import { Action } from 'redux-actions'
import { call, put, select } from 'redux-saga/effects'
import { myPuaIdSelector } from 'src/redux/auth/selectors'
import { followActionCreators } from 'src/redux/follow'
import { getAppStatusSaga } from 'src/redux/init-services/saga/getAppStatusSaga'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FetchProfileFollowersRequestPayload, accountActionCreators } from '../'
import { followersPaginationSelector } from '../selectors'

const getAuthorFollowersSaga = function*(puaId: string) {
  try {
    const followersPagination = yield select(followersPaginationSelector)
    const nextPageToken = R.propOr(null, 'nextPageToken', followersPagination)
    const params = nextPageToken ? { pageToken: nextPageToken } : {}
    const service = yield getServiceSaga(ApiServiceTypes.AUTHOR)
    const data = yield call(service.getAuthorFollowers, puaId, {
      ...params,
      pageSize: 20,
    })
    const myPuaId = yield select(myPuaIdSelector)
    yield put(
      followActionCreators.updateFollowStatuses({
        myPuaId,
        users: data.followers,
      })
    )
    yield put(accountActionCreators.fetchProfileFollowersSucceed(data))
  } catch (err) {
    console.log(err)
    // Todo: Handle error. Uncomment code below when we have UI for fetch data failure (i.e. retry
    // button to fetch data again when internet disconnects). Want to temporarily show skeleton
    // under no network
    // yield put(accountActionCreators.fetchProfileFollowersFail(err))
  }
}

export function* getAuthorFollowers(
  action: Action<FetchProfileFollowersRequestPayload>
) {
  try {
    const { puaId } = action.payload
    yield* getAppStatusSaga()
    yield* getAuthorFollowersSaga(puaId)
  } catch (err) {
    // TODO: handle error
  }
}
