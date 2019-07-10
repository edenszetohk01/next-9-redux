import * as R from 'ramda'
import { call, select } from 'redux-saga/effects'
import { LogInStatusType } from 'src/redux/auth'
import { getAxiosClientSaga } from 'src/redux/axios/saga/getAxiosClientSaga'
import { ApiServiceTypes, apiServiceFactory } from 'src/utils/apiServiceFactory'
import { AxiosInstanceTypes } from 'src/utils/axiosFactory'

const isAuthorizedUser = function*() {
  try {
    // Don't use loginStatusSelector(), as it require APP to be ready
    const status = yield select(R.path(['auth', 'loginStatus']))
    return status === LogInStatusType.AUTHORIZED
  } catch (err) {
    console.log(err)
    throw err
  }
}

export function* getServiceSaga(serviceType: ApiServiceTypes) {
  try {
    let axiosType
    switch (serviceType) {
      case ApiServiceTypes.FOLLOW:
        axiosType = AxiosInstanceTypes.WITH_AUTH
        break
      case ApiServiceTypes.STORY:
      case ApiServiceTypes.AUTHOR:
        axiosType = (yield call(isAuthorizedUser))
          ? AxiosInstanceTypes.WITH_AUTH
          : AxiosInstanceTypes.BASIC
        break
      default:
        throw new Error('Unknown serviceType')
    }

    // Create and dispatch API service
    const axiosClient = yield getAxiosClientSaga(axiosType)
    return apiServiceFactory.create(serviceType, axiosClient)
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
