import * as R from 'ramda'
import { Reducer, handleActions } from 'redux-actions'

import { storeOptions } from './actions'
import { PhotoGalleryViewPayload, UIPayload, UIState, UITypes } from './types'

export const INITIAL_STATE: UIState = {
  isShowGallery: false,
  isProfileActionButtonVisible: false,
}

// PhotoGalleryView
export const showPhotoGalleryView: Reducer<UIState, PhotoGalleryViewPayload> = (
  state,
  action
) =>
  R.merge(state, {
    isShowGallery: true,
    galleryMediaId: R.pathOr('', ['payload', 'mediaId'], action),
    gallery: R.pathOr([], ['payload', 'items'], action),
    title: R.pathOr('', ['payload', 'title'], action),
  })
export const hidePhotoGalleryView: Reducer<
  UIState,
  PhotoGalleryViewPayload
> = state =>
  R.merge(state, {
    isShowGallery: false,
    galleryMediaId: undefined,
    gallery: undefined,
    title: undefined,
  })

export const showProfileActionButton: Reducer<UIState, {}> = state =>
  R.mergeDeepLeft(
    {
      isProfileActionButtonVisible: true,
    },
    state
  )

export const hideProfileActionButton: Reducer<UIState, {}> = state =>
  R.mergeDeepLeft(
    {
      isProfileActionButtonVisible: false,
    },
    state
  )

export const uiReducer = handleActions<UIState, UIPayload>(
  {
    [UITypes.SHOW_PHOTO_GALLERY_VIEW]: showPhotoGalleryView,
    [UITypes.HIDE_PHOTO_GALLERY_VIEW]: hidePhotoGalleryView,
    [UITypes.SHOW_PROFILE_ACTION_BUTTON]: showProfileActionButton,
    [UITypes.HIDE_PROFILE_ACTION_BUTTON]: hideProfileActionButton,
  },
  INITIAL_STATE,
  storeOptions
)
