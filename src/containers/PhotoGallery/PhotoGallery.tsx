import * as R from 'ramda'
import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import ReactPhotoSwipe, {
  CorePhotoSwipeEventHook,
  ItemWithDescription,
} from 'src/components/ReactPhotoSwipe'
import { ApplicationState } from 'src/redux'
import { isPreviewSelector } from 'src/redux/story'
import { galleryImageItemSelector, uiCreators } from 'src/redux/ui'

type Props = {
  isShowGallery: boolean
  isWebView: boolean
  photoSwipeOptions: object
  items: ItemWithDescription[]
  title: string
  hidePhotoGalleryView: () => void
}

const getPhotoSwipeOptions = (isPreview: boolean) => ({
  facebookEl: !isPreview,
  fullscreenEl: false,
  menuEl: !isPreview,

  timeToIdle: null,
  timeToIdleOutside: null,
  closeOnScroll: false,
  history: true,
  showHideOpacity: true,
  pinchToClose: false,
  closeOnVerticalDrag: false,
  escKey: false,

  useHashConfig: true,
})

class PhotoGallery extends PureComponent<Props> {
  // TODO remove sample code
  onImageLoadComplete: CorePhotoSwipeEventHook['imageLoadComplete'] = reactPhotoSwipe => {
    if (reactPhotoSwipe.photoSwipe) {
      reactPhotoSwipe.photoSwipe.updateSize(true)
    }
  }

  render() {
    const {
      photoSwipeOptions,
      isShowGallery,
      isWebView,
      items,
      title,
    } = this.props
    return (
      <Fragment>
        <ReactPhotoSwipe
          isOpen={isShowGallery}
          isWebView={isWebView}
          items={items}
          onClose={() => {
            this.props.hidePhotoGalleryView()
          }}
          options={photoSwipeOptions}
          imageLoadComplete={this.onImageLoadComplete}
          customLeftArrow
          customRightArrow
          title={title}
        />
      </Fragment>
    )
  }
}

const photoSwipeOptionsSelector = createSelector(
  isPreviewSelector,
  galleryImageItemSelector,
  (state: ApplicationState) => R.pathOr('', ['ui', 'galleryMediaId'], state),
  (isPreview, items, mediaId) =>
    mediaId
      ? {
          ...getPhotoSwipeOptions(isPreview),
          index: R.findIndex(R.propEq('mediaId', mediaId), items),
        }
      : getPhotoSwipeOptions(isPreview)
)

const mapStateToProps = (state: ApplicationState) => {
  const { isShowGallery, title } = state.ui
  return {
    isShowGallery,
    photoSwipeOptions: photoSwipeOptionsSelector(state),
    items: galleryImageItemSelector(state),
    title,
  }
}

const mapDispatchToProps = {
  hidePhotoGalleryView: uiCreators.hidePhotoGalleryView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGallery)
