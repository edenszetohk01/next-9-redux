import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FetchStoryListRequestPayload, accountActionCreators } from '../'

export function* getStoryListWorker(
  action: Action<FetchStoryListRequestPayload>
) {
  try {
    const { accountId, pageToken } = action.payload
    const service = yield getServiceSaga(ApiServiceTypes.STORY)
    const { stories, pagination } = yield call(
      service.getStoriesByAuthor,
      accountId,
      18,
      pageToken
    )
    yield put(accountActionCreators.fetchStoryListSucceed(stories, pagination))
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
