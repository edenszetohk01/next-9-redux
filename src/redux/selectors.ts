import * as R from 'ramda'
import { LogInStatusType } from 'src/redux/auth'
import { ApplicationState } from 'src/redux/rootReducer'
import { AppStatusType } from 'src/redux/setup'

export const appStatusSelector = R.path(['setup', 'appStatus'])
export const loginStatusSelector = (state: ApplicationState) => {
  const appStatus = appStatusSelector(state)
  // Return Loading when app loading, as the status may change later
  if (appStatus === AppStatusType.LOADING) {
    return LogInStatusType.LOADING
  }
  return R.path(['auth', 'loginStatus'])(state)
}
