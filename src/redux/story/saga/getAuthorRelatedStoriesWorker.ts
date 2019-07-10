import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FetchRelatedStoriesRequestPayload, storyActionCreators } from '../'

export function* getAuthorRelatedStoriesWorker(
  action: Action<FetchRelatedStoriesRequestPayload>
) {
  try {
    const { storyId } = action.payload
    const service = yield getServiceSaga(ApiServiceTypes.STORY)
    const { stories } = yield call(service.getRelatedStoriesByAuthor, storyId)
    yield put(storyActionCreators.fetchAuthorRelatedStoriesSucceed(stories))
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
