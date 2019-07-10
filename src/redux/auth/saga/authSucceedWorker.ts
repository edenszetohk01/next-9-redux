import * as R from 'ramda'
import { Action } from 'redux-actions'
import { cancel, fork, put, take } from 'redux-saga/effects'

import {
  AuthActionTypes,
  CallbackWhenAuthSucceedPayload,
  DispatchActionWhenAuthSucceedPayload,
  authActionCreators,
  getAuthAction,
} from '../'

function* authSucceed() {
  try {
    const {
      payload: { status, profile },
    } = yield take(getAuthAction(AuthActionTypes.AUTH_SUCCEED))
    return { status, profile }
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}

function* authSucceedDispatch(actionType: string, payload: object) {
  try {
    const { status } = yield* authSucceed()
    const targetPayload = R.merge(payload, { loginStatus: status })
    yield put({
      type: actionType,
      payload: targetPayload,
    })
    yield put(authActionCreators.cancelDispatchActionWhenAuthSucceed())
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
function* authSucceedCallback(
  callback: CallbackWhenAuthSucceedPayload['callback']
) {
  try {
    const { status, profile } = yield* authSucceed()
    callback(status, profile)
    yield put(authActionCreators.cancelCallbackWhenAuthSucceed())
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}

export function* authSucceedWorker(
  action: Action<
    DispatchActionWhenAuthSucceedPayload | CallbackWhenAuthSucceedPayload
  >
) {
  try {
    const { actionType, payload, callback } = R.pathOr({}, ['payload'], action)
    let authSucceedTask
    if (typeof callback === 'function') {
      authSucceedTask = yield fork(authSucceedCallback, callback)
      yield take(
        getAuthAction(AuthActionTypes.CANCEL_CALLBACK_WHEN_AUTH_SUCCEED)
      )
    } else {
      authSucceedTask = yield fork(authSucceedDispatch, actionType, payload)
      yield take(
        getAuthAction(AuthActionTypes.CANCEL_DISPATCH_ACTION_WHEN_AUTH_SUCCEED)
      )
    }
    yield cancel(authSucceedTask)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}
