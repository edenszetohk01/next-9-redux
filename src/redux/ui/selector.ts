import * as R from 'ramda'
import { createSelector } from 'reselect'
import { ItemWithDescription } from 'src/components/ReactPhotoSwipe'
import { ApplicationState } from 'src/redux/rootReducer'
import { ImageObject } from 'src/types'

const getGallery = (state: ApplicationState) =>
  R.pathOr('', ['ui', 'gallery'], state)

export const galleryImageItemSelector = createSelector(
  getGallery,
  (images: ImageObject[]): ItemWithDescription[] =>
    R.map(
      ({ urls, caption, mediaId, width, height }) => ({
        src: urls.default,
        w: width,
        h: height,
        title: caption,
        mediaId,
        hashConfig: {
          name: 'media_id',
          value: mediaId,
        },
      }),
      images
    ) as ItemWithDescription[]
)
