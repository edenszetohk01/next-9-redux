import { AxiosInstance } from 'axios'
import { Action } from 'redux-actions'
import { AxiosInstanceTypes } from 'src/utils/axiosFactory'

// List of actions available
export enum AxiosActionTypes {
  GET_AXIOS_CLIENT_REQUEST = 'GET_AXIOS_CLIENT_REQUEST',
  GET_AXIOS_CLIENT_SUCCEED = 'GET_AXIOS_CLIENT_SUCCEED',
}

export type GetAxiosClientRequestPayload = {
  axiosType: AxiosInstanceTypes
}

export type GetAxiosClientSucceedPayload = {
  axiosType: AxiosInstanceTypes
  client: AxiosInstance
}

export type AxiosPayloads =
  | GetAxiosClientRequestPayload
  | GetAxiosClientSucceedPayload

export type AxiosActions = Action<AxiosPayloads>
