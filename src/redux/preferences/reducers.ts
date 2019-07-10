import * as R from 'ramda'
import { Reducer, handleActions } from 'redux-actions'

import { preferencesOptions } from './actions'
import {
  AdjustFontSizePayload,
  GetPreferencesSucceedPayload,
  PreferencesPayloads,
  PreferencesState,
  PreferencesTypes,
} from './types'

const INITIAL_STATE: PreferencesState = {
  fontSizeIndex: 1,
}

const getPreferencesSucceed: Reducer<
  PreferencesState,
  GetPreferencesSucceedPayload
> = (state, action) => R.mergeDeepLeft(action.payload, state)

const adjustFontSize: Reducer<
  PreferencesState,
  AdjustFontSizePayload
> = state =>
  R.mergeDeepLeft(
    {
      fontSizeIndex: (state.fontSizeIndex + 1) % 3,
    },
    state
  )

export const preferencesReducer = handleActions<
  PreferencesState,
  PreferencesPayloads
>(
  {
    [PreferencesTypes.GET_PREFERENCES_SUCCEED]: getPreferencesSucceed,
    [PreferencesTypes.ADJUST_FONT_SIZE]: adjustFontSize,
  },
  INITIAL_STATE,
  preferencesOptions
)
