import { createActions } from 'redux-actions'

import { StoryTypes } from './types'

export const storeOptions = {
  prefix: 'STORY',
}

export const storyActionCreators = createActions(
  {
    [StoryTypes.FETCH_STORY_REQUEST]: storyId => ({ storyId }),
    [StoryTypes.FETCH_STORY_SUCCEED]: story => story,
    [StoryTypes.FETCH_STORY_FAIL]: error => error,
    [StoryTypes.FETCH_PREVIEW_STORY_REQUEST]: storyId => ({ storyId }),
    [StoryTypes.FETCH_PREVIEW_STORY_SUCCEED]: story => story,
    [StoryTypes.FETCH_PREVIEW_STORY_FAIL]: error => error,
    [StoryTypes.FETCH_RELATED_STORIES_REQUEST]: storyId => ({ storyId }),
    [StoryTypes.FETCH_RELATED_STORIES_SUCCEED]: stories => stories,
    [StoryTypes.FETCH_AUTHOR_RELATED_STORIES_REQUEST]: storyId => ({ storyId }),
    [StoryTypes.FETCH_AUTHOR_RELATED_STORIES_SUCCEED]: stories => stories,
    [StoryTypes.FETCH_AUTHOR_RELATED_STORIES_FAIL]: error => error,
  },
  storeOptions
)

export const getStoryAction = (type: StoryTypes) =>
  `${storeOptions.prefix}/${type}`
