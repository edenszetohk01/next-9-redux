import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as R from 'ramda'

type MayBeBearerAuth = undefined | string
type Config = {
  bearerAuth?: string
}

export enum AxiosInstanceTypes {
  BASIC = 'basic',
  WITH_AUTH = 'withAuth',
}

const interceptorResponseHandler = (resp: AxiosResponse) => resp.data
const interceptorResponseErrorHandler = (err: any) => {
  const httpStatus = R.path(['response', 'status'], err)
  const responseError = R.pathOr(
    {
      errorCode: 'UNKNOWN_API_ERROR',
      name: 'UNKNOWN_API_ERROR',
      message: 'UNKNOWN_API_ERROR',
    },
    ['response', 'data', 'errors', 0], // Errors will be an error of only one entry
    err
  )
  const error: any = new Error(responseError.message)
  // Error object loses native properties (i.e. `message`, `stack`) so do not use R.assoc and
  // allow mutation
  error.errorCode = responseError.errorCode
  error.httpStatus = httpStatus

  return Promise.reject(error)
}

class AxiosFactory {
  registry: Map<AxiosInstanceTypes, [AxiosInstance, MayBeBearerAuth]>

  constructor() {
    this.registry = new Map()
  }

  /**
   * @private
   */
  create(axiosType: AxiosInstanceTypes, config: Config = {}): AxiosInstance {
    const bearerAuth: MayBeBearerAuth = config.bearerAuth
    const axiosInstance = axios.create({
      timeout: Number(process.env.API_TIMEOUT),
      baseURL: process.env.API_BASE_URL,
    })
    if (bearerAuth) {
      axiosInstance.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${bearerAuth}`
          return config
        },
        err => {
          return Promise.reject(err)
        }
      )
    }
    axiosInstance.interceptors.response.use(
      interceptorResponseHandler,
      interceptorResponseErrorHandler
    )
    this.registry.set(axiosType, [axiosInstance, bearerAuth])
    return axiosInstance
  }

  /**
   * @public
   */
  get(axiosType: AxiosInstanceTypes, config: Config = {}): AxiosInstance {
    const item = this.registry.get(axiosType)
    if (!item) {
      return this.create(axiosType, config)
    }
    const [instance, bearerAuth] = item
    if (bearerAuth === config.bearerAuth) {
      return instance
    }
    // bearer token updated, need to create a new client
    return this.create(axiosType, config)
  }
}

const factory = new AxiosFactory()

export const axiosFactory = factory
