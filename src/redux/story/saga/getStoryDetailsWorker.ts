import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import { followActionCreators } from 'src/redux/follow'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import webJsSdkService from 'src/services/webJsSdk/webJsSdkService'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FetchStoryRequestPayload, storyActionCreators } from '../'

export function* getStoryDetails(storyId: string) {
  try {
    const service = yield getServiceSaga(ApiServiceTypes.STORY)
    const { story } = yield call(service.getStoryDetails, storyId)
    yield put(storyActionCreators.fetchStorySucceed(story))
    yield put(followActionCreators.updateFollowStatus(story.author))

    // quick fix to trigger webview title change
    // TODO: pending for web-js-sdk provide set title feature
    if (typeof window != 'undefined') {
      webJsSdkService.isWebview().then(isWebView => {
        if (isWebView && window.location.hash.length == 0) {
          window.location.replace('#')
        }
      })
    }
  } catch (error) {
    yield put(storyActionCreators.fetchStoryFail({ ...error, storyId }))
  }
}

export function* getStoryDetailsWorker(
  action: Action<FetchStoryRequestPayload>
) {
  const { storyId } = action.payload
  yield getStoryDetails(storyId)
}
