import { put, take } from 'redux-saga/effects'
import {
  AxiosActionTypes,
  axiosActionCreators,
  getAxiosAction,
} from 'src/redux/axios'
import { AxiosInstanceTypes } from 'src/utils/axiosFactory'

export function* getAxiosClientSaga(axiosType: AxiosInstanceTypes) {
  try {
    let axiosClient
    yield put(axiosActionCreators.getAxiosClientRequest(axiosType))
    do {
      const { payload } = yield take(
        getAxiosAction(AxiosActionTypes.GET_AXIOS_CLIENT_SUCCEED)
      )
      if (payload.axiosType === axiosType) {
        axiosClient = payload.client
        break
      }
    } while (true)
    return axiosClient
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
