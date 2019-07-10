import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import apiErrorCodes from 'src/constants/apiErrorCodes'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { UnfollowRequestPayload, followActionCreators } from '../'

export function* unfollowWorker(action: Action<UnfollowRequestPayload>) {
  const { puaId, callback } = action.payload

  try {
    const service = yield getServiceSaga(ApiServiceTypes.FOLLOW)
    yield call(service.unfollowAuthor, puaId)
    yield put(followActionCreators.unfollowSucceed(puaId))
    callback && callback()
  } catch (error) {
    // TODO: handle error
    console.log(error)
    // If user has already unfollowed the given profile, will not consider as error since redux
    // state may simply not be updated
    error.errorCode === apiErrorCodes.HAVENT_FOLLOWED_USER
      ? yield put(followActionCreators.unfollowSucceed(puaId))
      : yield put(followActionCreators.unfollowFail({ error, puaId }))
  }
}
