import { Action } from 'redux-actions'
import { call, put } from 'redux-saga/effects'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { FetchCustomStoryListRequestPayload, accountActionCreators } from '../'

export function* getCustomStoryListWorker(
  action: Action<FetchCustomStoryListRequestPayload>
) {
  try {
    const { listId } = action.payload
    const service = yield getServiceSaga(ApiServiceTypes.STORY)
    const { stories } = yield call(service.getCustomStoryListById, listId)
    yield put(accountActionCreators.fetchCustomStoryListSucceed(stories))
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
