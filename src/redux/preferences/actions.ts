import { createActions } from 'redux-actions'

import { PreferencesTypes } from './types'

export const preferencesOptions = {
  prefix: 'PREFERENCES',
}

export const preferencesActionCreators = createActions(
  {
    [PreferencesTypes.GET_PREFERENCES_SUCCEED]: preferences => preferences,
    [PreferencesTypes.ADJUST_FONT_SIZE]: () => null,
  },
  preferencesOptions
)
