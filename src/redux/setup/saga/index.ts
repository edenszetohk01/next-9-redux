import { put } from 'redux-saga/effects'
import authorizeSaga from 'src/redux/auth/saga/authorizeSaga'

import { AppStatusType, setupActionCreators } from '../'

export default function* setupSaga() {
  try {
    if (typeof window !== 'undefined') {
      /*
       * Only run auth check in client side
       * This task will block process and check if user connected sso
       * Also, will get user profile if it connected sso
       */
      yield* authorizeSaga()
    }

    // Other app setup here
    // code
    // code
    // code

    yield put(setupActionCreators.changeAppStatus(AppStatusType.READY))
  } catch (e) {
    console.log(e)
  }
}
