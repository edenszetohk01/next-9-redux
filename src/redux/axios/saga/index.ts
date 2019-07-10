import { all, takeLatest } from 'redux-saga/effects'
import { AxiosActionTypes, getAxiosAction } from 'src/redux/axios'

import { getAxiosClientWorker } from './getAxiosClientWorker'

export function* axiosWatcher() {
  try {
    yield all([
      takeLatest(
        getAxiosAction(AxiosActionTypes.GET_AXIOS_CLIENT_REQUEST),
        getAxiosClientWorker
      ),
    ])
  } catch (e) {
    console.log(e)
  }
}
