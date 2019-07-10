import { all, fork } from 'redux-saga/effects'

import { accountWatcher } from './account/saga'
import { authSaga } from './auth/saga'
import { axiosWatcher } from './axios/saga'
import { followWatcher } from './follow/saga'
import { preferencesWatcher } from './preferences/saga'
import setupSaga from './setup/saga'
import { storyWatcher } from './story/saga'

const combineSagas = (sagas: any) =>
  function* rootSaga() {
    try {
      // must-have setup
      yield all(sagas.map(fork))
      // App setup will block other saga below but not above
      yield* setupSaga()
    } catch (err) {
      console.log(err)
    }
  }

export const rootSaga = combineSagas([
  authSaga,
  axiosWatcher,
  storyWatcher,
  accountWatcher,
  preferencesWatcher,
  followWatcher,
])
