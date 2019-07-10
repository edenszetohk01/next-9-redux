import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import { followActionCreators } from 'src/redux/follow'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import webJsSdkService from 'src/services/webJsSdk/webJsSdkService'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FetchProfileRequestPayload, accountActionCreators } from '../'

export function* getAuthor(puaId: string) {
  try {
    const service = yield getServiceSaga(ApiServiceTypes.AUTHOR)
    const { author } = yield call(service.getAuthor, puaId)
    yield put(accountActionCreators.fetchProfileSucceed(author))
    yield put(followActionCreators.updateFollowStatus(author))

    // quick fix to trigger webview title change
    // TODO: pending for web-js-sdk provide set title feature
    if (typeof window != 'undefined') {
      webJsSdkService.isWebview().then(isWebView => {
        if (isWebView && window.location.hash.length == 0) {
          window.location.replace('#')
        }
      })
    }
  } catch (err) {
    yield put(accountActionCreators.fetchProfileFail({ ...err, puaId }))
  }
}

export function* getAuthorWorker(action: Action<FetchProfileRequestPayload>) {
  const { puaId } = action.payload
  yield getAuthor(puaId)
}
