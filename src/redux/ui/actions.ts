import { createActions } from 'redux-actions'

import { UITypes } from './types'

export const storeOptions = {
  prefix: 'UI',
}

export const uiCreators = createActions(
  {
    [UITypes.SHOW_PHOTO_GALLERY_VIEW]: undefined,
    [UITypes.HIDE_PHOTO_GALLERY_VIEW]: undefined,
    [UITypes.SHOW_PROFILE_ACTION_BUTTON]: undefined,
    [UITypes.HIDE_PROFILE_ACTION_BUTTON]: undefined,
  },
  storeOptions
)
