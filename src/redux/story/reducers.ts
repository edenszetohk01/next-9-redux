import * as R from 'ramda'
import { Reducer, handleActions } from 'redux-actions'

import { storeOptions } from './actions'
import {
  ErrorPayload,
  FetchRelatedStoriesRequestPayload,
  FetchRelatedStoriesSucceedPayload,
  FetchStoryRequestPayload,
  FetchStorySucceedPayload,
  StoryPayloads,
  StoryState,
  StoryTypes,
} from './types'

const INITIAL_STATE: StoryState = {
  previewArticle: {
    details: undefined,
    isFetching: false,
    error: undefined,
  },
  article: {
    details: undefined,
    isFetching: false,
    error: undefined,
  },
  relatedArticles: {
    list: undefined,
    isFetching: false,
    error: undefined,
  },
  relatedArticleOfAuthor: {
    list: undefined,
    isFetching: false,
    error: undefined,
  },
}

const fetchArticleRequest: Reducer<
  StoryState,
  FetchStoryRequestPayload
> = state =>
  R.mergeDeepLeft(
    {
      article: {
        ...INITIAL_STATE.article,
        isFetching: true,
      },
    },
    state
  )

const fetchArticleSucceed: Reducer<StoryState, FetchStorySucceedPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      article: {
        details: R.over(
          R.lensProp('author'),
          R.omit(['isFollowing']),
          action.payload
        ),
        isFetching: false,
      },
    },
    state
  )

const fetchArticleFail: Reducer<StoryState, ErrorPayload> = (state, action) =>
  R.mergeDeepLeft(
    {
      article: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

const fetchPreviewArticleRequest: Reducer<
  StoryState,
  FetchStoryRequestPayload
> = state =>
  R.mergeDeepLeft(
    {
      previewArticle: {
        ...INITIAL_STATE.previewArticle,
        isFetching: true,
      },
    },
    state
  )

const fetchPreviewArticleSucceed: Reducer<
  StoryState,
  FetchStorySucceedPayload
> = (state, action) =>
  R.mergeDeepLeft(
    {
      previewArticle: {
        details: action.payload,
        isFetching: false,
      },
    },
    state
  )

const fetchPreviewArticleFail: Reducer<StoryState, ErrorPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      previewArticle: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

const fetchRelatedArticlesRequest: Reducer<
  StoryState,
  FetchRelatedStoriesRequestPayload
> = state =>
  R.mergeDeepLeft(
    {
      relatedArticles: {
        list: INITIAL_STATE.relatedArticles.list,
        isFetching: true,
      },
    },
    state
  )

const fetchRelatedArticlesSucceed: Reducer<
  StoryState,
  FetchRelatedStoriesSucceedPayload
> = (state, action) =>
  R.mergeDeepLeft(
    {
      relatedArticles: {
        list: action.payload,
        isFetching: false,
      },
    },
    state
  )

const fetchRelatedArticlesFail: Reducer<StoryState, ErrorPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      relatedArticles: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

const fetchAuthorRelatedArticlesRequest: Reducer<
  StoryState,
  FetchRelatedStoriesRequestPayload
> = state =>
  R.mergeDeepLeft(
    {
      relatedArticleOfAuthor: {
        list: INITIAL_STATE.relatedArticles.list,
        isFetching: true,
      },
    },
    state
  )

const fetchAuthorRelatedArticlesSucceed: Reducer<
  StoryState,
  FetchRelatedStoriesSucceedPayload
> = (state, action) =>
  R.mergeDeepLeft(
    {
      relatedArticleOfAuthor: {
        list: action.payload,
        isFetching: false,
      },
    },
    state
  )

const fetchAuthorRelatedArticlesFail: Reducer<StoryState, ErrorPayload> = (
  state,
  action
) =>
  R.mergeDeepLeft(
    {
      relatedArticleOfAuthor: {
        isFetching: false,
        error: action.payload,
      },
    },
    state
  )

export const storyReducer = handleActions<StoryState, StoryPayloads>(
  {
    [StoryTypes.FETCH_STORY_REQUEST]: fetchArticleRequest,
    [StoryTypes.FETCH_STORY_SUCCEED]: fetchArticleSucceed,
    [StoryTypes.FETCH_STORY_FAIL]: fetchArticleFail,
    [StoryTypes.FETCH_PREVIEW_STORY_REQUEST]: fetchPreviewArticleRequest,
    [StoryTypes.FETCH_PREVIEW_STORY_SUCCEED]: fetchPreviewArticleSucceed,
    [StoryTypes.FETCH_PREVIEW_STORY_FAIL]: fetchPreviewArticleFail,
    [StoryTypes.FETCH_RELATED_STORIES_REQUEST]: fetchRelatedArticlesRequest,
    [StoryTypes.FETCH_RELATED_STORIES_SUCCEED]: fetchRelatedArticlesSucceed,
    [StoryTypes.FETCH_RELATED_STORIES_FAIL]: fetchRelatedArticlesFail,
    [StoryTypes.FETCH_AUTHOR_RELATED_STORIES_REQUEST]: fetchAuthorRelatedArticlesRequest,
    [StoryTypes.FETCH_AUTHOR_RELATED_STORIES_SUCCEED]: fetchAuthorRelatedArticlesSucceed,
    [StoryTypes.FETCH_AUTHOR_RELATED_STORIES_FAIL]: fetchAuthorRelatedArticlesFail,
  },
  INITIAL_STATE,
  storeOptions
)
