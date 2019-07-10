import { call, put } from 'redux-saga/effects'
import { getServiceSaga } from 'src/redux/init-services/saga/getServiceSaga'
import ssoService from 'src/services/auth/ssoService'
import { ApiServiceTypes } from 'src/utils/apiServiceFactory'

import { LogInStatusType, authActionCreators } from '../'

export default function* authorizeSaga() {
  try {
    // ssoService can only be used in browser
    // Cannot use process.browser in typescript: https://dev.to/dala00/nuxtjsssr-2jda
    if (typeof window === 'undefined') {
      throw new Error('Cannot run client-side setup saga in SSR')
    }
    const status = yield call(ssoService.getStatus)
    const loginStatus =
      status === 'connected'
        ? LogInStatusType.AUTHORIZED
        : LogInStatusType.UNAUTHORIZED
    let profile:
      | {
          puaId: string
          avatar: string
        }
      | undefined = undefined
    yield put(authActionCreators.checkStatusSucceed(loginStatus))
    // If logged in, get tokens and get user profile
    if (loginStatus === LogInStatusType.AUTHORIZED) {
      const tokens = yield call(ssoService.getTokens)
      const commentToken = tokens.comment.token
      const puaToken = tokens.pua.token
      yield put(authActionCreators.getTokensSucceed(commentToken, puaToken))
      // Get user's profile
      const service = yield getServiceSaga(ApiServiceTypes.AUTHOR)
      const {
        author: { _id: puaId, avatar },
      } = yield call(service.getMyProfile)
      profile = { puaId, avatar }
      yield put(authActionCreators.getProfileSucceed(puaId, avatar))
    }
    // authSucceed means tokens and profile are ready
    yield put(authActionCreators.authSucceed(loginStatus, profile))
  } catch (e) {
    // TODO: handle auth fail error
    console.log(e)
  }
}
