import { createActions } from 'redux-actions'

import { AppStatusType, SetupActionTypes } from './types'

export const storeOptions = {
  prefix: 'SET_UP',
}

export const setupActionCreators = createActions(
  {
    [SetupActionTypes.CHANGE_APP_STATUS]: (status: AppStatusType) => ({
      status,
    }),
    [SetupActionTypes.SET_PATHNAME]: pathname => ({ pathname }),
  },
  storeOptions
)

export const getSetupAction = (type: SetupActionTypes) =>
  `${storeOptions.prefix}/${type}`
