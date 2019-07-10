import { Action } from 'redux-actions'
import { ErrorType, Story, StoryId } from 'src/types'

// Describe state shape
export type StoryState = {
  previewArticle: {
    details?: Story
    isFetching: boolean
    error?: ErrorType
  }
  article: {
    details?: Story
    isFetching: boolean
    error?: ErrorType
  }
  relatedArticles: {
    list?: Story[]
    isFetching: boolean
    error?: ErrorType
  }
  relatedArticleOfAuthor: {
    list?: Story[]
    isFetching: boolean
    error?: ErrorType
  }
}

// List of actions available
export enum StoryTypes {
  FETCH_STORY_REQUEST = 'FETCH_STORY_REQUEST',
  FETCH_STORY_SUCCEED = 'FETCH_STORY_SUCCEED',
  FETCH_STORY_FAIL = 'FETCH_STORY_FAIL',
  UPDATE_STORY = 'UPDATE_STORY',
  FETCH_PREVIEW_STORY_FAIL = 'FETCH_PREVIEW_STORY_FAIL',
  FETCH_PREVIEW_STORY_REQUEST = 'FETCH_PREVIEW_STORY_REQUEST',
  FETCH_PREVIEW_STORY_SUCCEED = 'FETCH_PREVIEW_STORY_SUCCEED',
  FETCH_RELATED_STORIES_REQUEST = 'FETCH_RELATED_STORIES_REQUEST',
  FETCH_RELATED_STORIES_SUCCEED = 'FETCH_RELATED_STORIES_SUCCEED',
  FETCH_RELATED_STORIES_FAIL = 'FETCH_RELATED_STORIES_FAIL',
  FETCH_AUTHOR_RELATED_STORIES_REQUEST = 'FETCH_AUTHOR_RELATED_STORIES_REQUEST',
  FETCH_AUTHOR_RELATED_STORIES_SUCCEED = 'FETCH_AUTHOR_RELATED_STORIES_SUCCEED',
  FETCH_AUTHOR_RELATED_STORIES_FAIL = 'FETCH_AUTHOR_RELATED_STORIES_FAIL',
}

// Describe payload of different actions
export type FetchStoryRequestPayload = {
  storyId: StoryId
}
export type FetchStorySucceedPayload = Story
export type UpdateStoryPayload = FetchStoryRequestPayload & {
  loginStatus: string
}
export type FetchRelatedStoriesRequestPayload = {
  storyId: StoryId
}
export type FetchRelatedStoriesSucceedPayload = Story[]
export type ErrorPayload = ErrorType

export type StoryPayloads =
  | FetchStoryRequestPayload
  | FetchStorySucceedPayload
  | FetchRelatedStoriesRequestPayload
  | FetchRelatedStoriesSucceedPayload
  | ErrorPayload
export type StoryActions = Action<StoryPayloads>
