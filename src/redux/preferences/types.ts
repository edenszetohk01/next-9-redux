import { Action } from 'redux-actions'
import { Preferences } from 'src/types'

// Describe state shape
export type PreferencesState = Preferences

// List of actions available
export enum PreferencesTypes {
  GET_PREFERENCES_SUCCEED = 'GET_PREFERENCES_SUCCEED',
  ADJUST_FONT_SIZE = 'ADJUST_FONT_SIZE',
}

// Describe payload of different actions
export type GetPreferencesSucceedPayload = Partial<PreferencesState>
export type AdjustFontSizePayload = null

export type PreferencesPayloads =
  | GetPreferencesSucceedPayload
  | AdjustFontSizePayload
export type PreferencesActions = Action<PreferencesPayloads>
