import { Action } from 'redux-actions'
import { put, select, take } from 'redux-saga/effects'
import { AuthActionTypes, getAuthAction } from 'src/redux/auth'
import {
  GetAxiosClientRequestPayload,
  axiosActionCreators,
} from 'src/redux/axios'
import { AxiosInstanceTypes, axiosFactory } from 'src/utils/axiosFactory'

function* selectTokensSaga() {
  try {
    const isBrowser = typeof window !== 'undefined'
    // SSR does not get tokens, only wait in browser
    if (!isBrowser) {
      throw new Error('Server side does not have tokens, you cannot get tokens')
    }
    // Select token
    let tokens = yield select(state => state.auth.tokens)
    // Wait for GET_TOKENS_SUCCEED action when there are no tokens in redux store
    // TODO: have a better checking and design on data structure tokens
    if (!tokens.pua) {
      ;({ payload: tokens } = yield take(
        getAuthAction(AuthActionTypes.GET_TOKENS_SUCCEED)
      ))
    }
    return tokens
  } catch (e) {
    // TODO: handle error
    console.log(e)
  }
}

export function* getAxiosClientWorker(
  action: Action<GetAxiosClientRequestPayload>
) {
  try {
    const axiosType = action.payload.axiosType
    let config
    switch (axiosType) {
      case AxiosInstanceTypes.BASIC:
        // Basic axios instance does not require token
        config = {}
        break
      case AxiosInstanceTypes.WITH_AUTH: {
        const tokens = yield selectTokensSaga()
        config = { bearerAuth: tokens.pua }
        axiosFactory.create(AxiosInstanceTypes.WITH_AUTH, config)
        break
      }
      default:
        break
    }
    yield put(
      axiosActionCreators.getAxiosClientSucceed(
        axiosType,
        axiosFactory.get(axiosType, config)
      )
    )
  } catch (e) {
    // TODO: handle error
    console.log(e)
  }
}
