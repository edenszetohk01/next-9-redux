import { createActions } from 'redux-actions'

import { AxiosActionTypes } from './types'

export const storeOptions = {
  prefix: 'AXIOS',
}

export const axiosActionCreators = createActions(
  {
    [AxiosActionTypes.GET_AXIOS_CLIENT_REQUEST]: axiosType => ({ axiosType }),
    [AxiosActionTypes.GET_AXIOS_CLIENT_SUCCEED]: (axiosType, client) => ({
      axiosType,
      client,
    }),
  },
  storeOptions
)

export const getAxiosAction = (type: AxiosActionTypes) =>
  `${storeOptions.prefix}/${type}`
