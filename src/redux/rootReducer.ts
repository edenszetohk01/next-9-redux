import { Reducer, combineReducers } from 'redux'

import { AccountActions, AccountState, accountReducer } from './account'
import { AuthActions, AuthState, authReducer } from './auth/'
import { FollowState, followReducer } from './follow'
import {
  PreferencesActions,
  PreferencesState,
  preferencesReducer,
} from './preferences'
import { SetupActions, SetupState, setupReducers } from './setup'
import { StoryActions, StoryState, storyReducer } from './story'
import { UIAction, UIState, uiReducer } from './ui'

export type ApplicationState = {
  auth: AuthState
  story: StoryState
  account: AccountState
  follow: FollowState
  ui: UIState
  preferences: PreferencesState
  setup: SetupState
}

export type ApplicationActions =
  | SetupActions
  | AuthActions
  | StoryActions
  | AccountActions
  | PreferencesActions
  | UIAction

const combindedReducers = combineReducers<ApplicationState>({
  setup: setupReducers,
  story: storyReducer,
  account: accountReducer,
  follow: followReducer,
  ui: uiReducer,
  preferences: preferencesReducer,
  auth: authReducer,
})

export const rootReducer: Reducer<ApplicationState, ApplicationActions> = (
  state: ApplicationState,
  action: ApplicationActions
) => {
  return combindedReducers(state, action)
}
