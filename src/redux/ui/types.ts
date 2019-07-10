import { Action } from 'redux-actions'
import { ImageObject } from 'src/types'

// Describe state shape
export interface UIState {
  isShowGallery: boolean
  galleryMediaId?: string
  gallery?: ImageObject[]
  title?: string
  isProfileActionButtonVisible: boolean
}

// List of actions available
export enum UITypes {
  SHOW_PHOTO_GALLERY_VIEW = 'SHOW_PHOTO_GALLERY_VIEW',
  HIDE_PHOTO_GALLERY_VIEW = 'HIDE_PHOTO_GALLERY_VIEW',
  SHOW_PROFILE_ACTION_BUTTON = 'SHOW_PROFILE_ACTION_BUTTON',
  HIDE_PROFILE_ACTION_BUTTON = 'HIDE_PROFILE_ACTION_BUTTON',
}

// Describe payload of different actions
export type PhotoGalleryViewPayload = {
  mediaId?: string
  title?: string
  items?: ImageObject[]
}
export type UIPayload = PhotoGalleryViewPayload
export type UIAction = Action<UIPayload>
