import { AxiosInstance } from 'axios'
import { StoryId } from 'src/types'

export class StoryService {
  axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  getStoryDetails = (storyId: StoryId) =>
    this.axiosInstance.get(`/stories/${storyId}`)

  getPreviewStoryDetails = (storyId: StoryId) =>
    this.axiosInstance.get(`/storyPreviews/${storyId}`)

  getRelatedStories = (storyId: StoryId) =>
    this.axiosInstance.get(`/stories/${storyId}/relatedStories`)

  getRelatedStoriesByAuthor = (storyId: StoryId, limit?: number) =>
    this.axiosInstance.get(
      `/stories/${storyId}/relatedStoriesByAuthor?limit=${limit || 3}`
    )

  getStoriesByAuthor = (author: string, pageSize: number, pageToken?: string) =>
    this.axiosInstance.get('/stories', {
      params: { author, pageSize, pageToken },
    })

  getCustomStoryListById = (listId: string) =>
    this.axiosInstance.get(`/customStoryLists/${listId}/stories`)
}
