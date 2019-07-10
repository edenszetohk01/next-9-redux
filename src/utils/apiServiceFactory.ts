import { AxiosInstance } from 'axios'
import { AuthorService } from 'src/services/author/AuthorService'
import { FollowService } from 'src/services/follow/FollowService'
import { StoryService } from 'src/services/story/StoryService'

export enum ApiServiceTypes {
  STORY = 'STORY',
  FOLLOW = 'FOLLOW',
  AUTHOR = 'AUTHOR',
}

// TODO: cache the service instead of create a new one everytime
class ApiServiceFactory {
  create(serviceType: ApiServiceTypes, axiosInstance: AxiosInstance) {
    switch (serviceType) {
      case ApiServiceTypes.STORY:
        return new StoryService(axiosInstance)
      case ApiServiceTypes.FOLLOW:
        return new FollowService(axiosInstance)
      case ApiServiceTypes.AUTHOR:
        return new AuthorService(axiosInstance)
    }
  }
}

export const apiServiceFactory = new ApiServiceFactory()
