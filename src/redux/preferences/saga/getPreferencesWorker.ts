import { delay, put } from 'redux-saga/effects'
import preferencesApi from 'src/services/preferences'

import { preferencesActionCreators } from '..'

export function* getPreferencesWorker() {
  try {
    const preferences = preferencesApi.getPreferences()
    // FIXME: delay is to prevent client and server rendering are not identical
    yield delay(100)
    yield put(preferencesActionCreators.getPreferencesSucceed(preferences))
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
