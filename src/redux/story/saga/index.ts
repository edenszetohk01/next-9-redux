import { all, takeLatest } from 'redux-saga/effects'

import { StoryTypes, getStoryAction } from '../'
import { getAuthorRelatedStoriesWorker } from './getAuthorRelatedStoriesWorker'
import { getPreviewStoryDetailsWorker } from './getPreviewStoryDetailsWorker'
import { getRelatedStoriesWorker } from './getRelatedStoriesWorker'
import { getStoryDetailsWorker } from './getStoryDetailsWorker'
import { updateStoryDetailsWorker } from './updateStoryDetailsWorker'

export function* storyWatcher() {
  try {
    yield all([
      takeLatest(
        getStoryAction(StoryTypes.FETCH_STORY_REQUEST),
        getStoryDetailsWorker
      ),
      takeLatest(
        getStoryAction(StoryTypes.UPDATE_STORY),
        updateStoryDetailsWorker
      ),
      takeLatest(
        getStoryAction(StoryTypes.FETCH_PREVIEW_STORY_REQUEST),
        getPreviewStoryDetailsWorker
      ),
      takeLatest(
        getStoryAction(StoryTypes.FETCH_RELATED_STORIES_REQUEST),
        getRelatedStoriesWorker
      ),
      takeLatest(
        getStoryAction(StoryTypes.FETCH_AUTHOR_RELATED_STORIES_REQUEST),
        getAuthorRelatedStoriesWorker
      ),
    ])
  } catch (e) {
    // TODO: handle error
    console.log(e)
  }
}
