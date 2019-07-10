import * as R from 'ramda'
import { Action } from 'redux-actions'
import { call } from 'redux-saga/effects'
import ssoService from 'src/services/auth/ssoService'

import { LoginPayload } from '../'

export function* loginWorker(action: Action<LoginPayload>) {
  try {
    const redirectUrl = R.pathOr(
      window.location.origin,
      ['payload', 'redirectUrl'],
      action
    )

    yield call(ssoService.login, redirectUrl)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}
