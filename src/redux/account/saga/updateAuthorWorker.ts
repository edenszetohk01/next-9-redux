import { Action } from 'redux-actions'
import { LogInStatusType } from 'src/redux/auth'

import { getAuthor } from './getAuthorWorker'
import { UpdateProfilePayload } from '..'

export function* updateAuthorWorker(action: Action<UpdateProfilePayload>) {
  try {
    const { puaId, loginStatus } = action.payload
    if (loginStatus === LogInStatusType.AUTHORIZED) {
      yield getAuthor(puaId)
    }
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
