import { AxiosInstance } from 'axios'

export class FollowService {
  axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  followAuthor = async (puaId: string) =>
    this.axiosInstance.post(`/authors/${puaId}/followers`, {})

  unfollowAuthor = async (puaId: string) =>
    this.axiosInstance.delete(`/authors/${puaId}/followers`, {})

  getFollowings = async (
    puaId: string,
    pageSize: number,
    pageToken?: string
  ) => {
    return this.axiosInstance.get(`/authors/${puaId}/followings`, {
      params: {
        pageSize,
        pageToken,
      },
    })
  }
  getFollowers = async (
    puaId: string,
    pageSize: number,
    pageToken?: string
  ) => {
    return this.axiosInstance.get(`/authors/${puaId}/followers`, {
      params: {
        pageSize,
        pageToken,
      },
    })
  }
}
