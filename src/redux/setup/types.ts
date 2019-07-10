import { Action } from 'redux-actions'

export enum AppStatusType {
  LOADING = 'LOADING',
  READY = 'READY',
}

// Describe state shape
export type SetupState = {
  appStatus: AppStatusType
  pathname: string
}

// List of actions available
export enum SetupActionTypes {
  CHANGE_APP_STATUS = 'CHANGE_APP_STATUS',
  SET_PATHNAME = 'SET_PATHNAME',
}

export type AppStatusChangedPayload = {
  status: AppStatusType
}

export type SetPathnamePayload = {
  pathname: string
}

export type SetupPayloads = AppStatusChangedPayload | SetPathnamePayload

export type SetupActions = Action<SetupPayloads>
