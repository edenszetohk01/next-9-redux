import { all, takeLatest } from 'redux-saga/effects'
import { authSucceedWorker } from 'src/redux/auth/saga/authSucceedWorker'
import { loginWorker } from 'src/redux/auth/saga/loginWorker'
import ssoService from 'src/services/auth/ssoService'

import { AuthActionTypes, getAuthAction } from '../'

export function* authSaga() {
  try {
    yield all([
      takeLatest(getAuthAction(AuthActionTypes.LOGIN), loginWorker),
      takeLatest(getAuthAction(AuthActionTypes.LOGOUT), ssoService.logout),
      takeLatest(
        getAuthAction(AuthActionTypes.DISPATCH_ACTION_WHEN_AUTH_SUCCEED),
        authSucceedWorker
      ),
      takeLatest(
        getAuthAction(AuthActionTypes.CALLBACK_WHEN_AUTH_SUCCEED),
        authSucceedWorker
      ),
    ])
  } catch (e) {
    console.log(e)
  }
}
