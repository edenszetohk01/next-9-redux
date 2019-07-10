import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import apiErrorCodes from 'src/constants/apiErrorCodes'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FollowRequestPayload, followActionCreators } from '../'

export function* followWorker(action: Action<FollowRequestPayload>) {
  const { puaId, callback } = action.payload

  try {
    const service = yield getServiceSaga(ApiServiceTypes.FOLLOW)
    yield call(service.followAuthor, puaId)
    yield put(followActionCreators.followSucceed(puaId))
    callback && callback()
  } catch (error) {
    // TODO: handle error
    console.log(error)
    // If user is already following the given profile, will not consider as error since redux
    // state may simply not be updated
    error.errorCode === apiErrorCodes.ALREADY_FOLLOWED_USER
      ? yield put(followActionCreators.followSucceed(puaId))
      : yield put(followActionCreators.followFail({ error, puaId }))
  }
}
