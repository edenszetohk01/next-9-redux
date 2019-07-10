import { call, select, take } from 'redux-saga/effects'
import { appStatusSelector } from 'src/redux/selectors'
import {
  AppStatusType,
  SetupActionTypes,
  getSetupAction,
} from 'src/redux/setup'

const isAppLoading = function*() {
  try {
    const appStatus = yield select(appStatusSelector)
    return appStatus === AppStatusType.LOADING
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}

export function* getAppStatusSaga() {
  try {
    const isClient = typeof window !== 'undefined'
    // We don't need to wait in SSR or Client App is ready
    if (isClient && (yield call(isAppLoading))) {
      // We need user token to get profile, so we need to wait until app become ready
      do {
        yield take(getSetupAction(SetupActionTypes.CHANGE_APP_STATUS))
      } while (yield call(isAppLoading))
    }
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
