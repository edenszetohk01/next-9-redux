import { AxiosInstance } from 'axios'

export class AuthorService {
  axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  getAuthor = (authorId: string) =>
    this.axiosInstance.get(`/authors/${authorId}`)

  // Will throw error if not authenticated
  getMyProfile = () => this.axiosInstance.get(`/me`)

  getAuthorFollowings = (
    authorId: string,
    params: { pageToken?: string; pageSize?: string }
  ) => this.axiosInstance.get(`/authors/${authorId}/followings`, { params })

  getAuthorFollowers = (
    authorId: string,
    params: { pageToken?: string; pageSize?: string }
  ) => this.axiosInstance.get(`/authors/${authorId}/followers`, { params })
}
