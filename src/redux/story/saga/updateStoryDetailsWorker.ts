import { Action } from 'redux-actions'
import { LogInStatusType } from 'src/redux/auth'

import { getStoryDetails } from './getStoryDetailsWorker'
import { UpdateStoryPayload } from '..'

export function* updateStoryDetailsWorker(action: Action<UpdateStoryPayload>) {
  try {
    const { storyId, loginStatus } = action.payload
    if (loginStatus === LogInStatusType.AUTHORIZED) {
      yield getStoryDetails(storyId)
    }
  } catch (err) {
    // TODO: handle error
    console.log(err)
  }
}
