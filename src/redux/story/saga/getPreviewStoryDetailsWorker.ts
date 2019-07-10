import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import { getAppStatusSaga } from 'src/redux/init-services/saga/getAppStatusSaga'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FetchStoryRequestPayload, storyActionCreators } from '../'

const updatePreviewStoryDetailsSaga = function*(storyId: string) {
  try {
    const service = yield getServiceSaga(ApiServiceTypes.STORY)
    const { storyPreview } = yield call(service.getPreviewStoryDetails, storyId)
    yield put(storyActionCreators.fetchPreviewStorySucceed(storyPreview))
  } catch (error) {
    yield put(storyActionCreators.fetchPreviewStoryFail({ ...error, storyId }))
  }
}

export function* getPreviewStoryDetailsWorker(
  action: Action<FetchStoryRequestPayload>
) {
  try {
    const { storyId } = action.payload
    yield* getAppStatusSaga()
    yield* updatePreviewStoryDetailsSaga(storyId)
  } catch (err) {
    // TODO: handle error
  }
}
