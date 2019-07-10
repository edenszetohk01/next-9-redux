import { call, select } from 'redux-saga/effects'
import preferencesApi from 'src/services/preferences'

export function* setPreferencesWorker() {
  try {
    const { preferences } = yield select(store => store)
    yield call(preferencesApi.setPreferences, preferences)
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
