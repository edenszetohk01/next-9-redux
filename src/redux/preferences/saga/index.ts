import { all, spawn, takeEvery } from 'redux-saga/effects'

import { PreferencesActions, preferencesOptions } from '../'
import { getPreferencesWorker } from './getPreferencesWorker'
import { setPreferencesWorker } from './setPreferencesWorker'

const actionExp = new RegExp(`^${preferencesOptions.prefix}`, 'i')

export function* preferencesWatcher() {
  try {
    yield spawn(getPreferencesWorker)
    yield all([
      takeEvery(
        (action: PreferencesActions) => actionExp.test(action.type),
        setPreferencesWorker
      ),
    ])
  } catch (e) {
    // TODO: handle error
    console.log(e)
  }
}
