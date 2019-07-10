import * as R from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from 'src/redux'
import { PhotoGalleryViewPayload, uiCreators } from 'src/redux/ui'
import { ImageObject } from 'src/types'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  cursor: pointer;
`

type Props = {
  children?: React.ReactNode
  mediaId: string
  items: ImageObject[]
  isShowGallery: boolean
  title: string
  showPhotoGallery: (action: PhotoGalleryViewPayload) => void
}

class PhotoGalleryToggleWrapper extends Component<Props> {
  componentDidMount() {
    this.handleHash()
  }

  handleHash = () => {
    const { items, isShowGallery, showPhotoGallery, title } = this.props
    const hashMediaId = R.compose<
      string,
      string,
      string[],
      string[][],
      object,
      string
    >(
      R.propOr('', 'media_id'),
      R.fromPairs,
      R.map(R.split('=')),
      R.split('&'),
      R.tail
    )(window.location.hash)
    if (
      !isShowGallery &&
      R.findIndex(R.propEq('mediaId', hashMediaId), items) > -1
    ) {
      showPhotoGallery({
        items,
        mediaId: hashMediaId,
        title,
      })
    }
  }

  render() {
    const { children, items, mediaId, showPhotoGallery, title } = this.props
    return (
      <StyledWrapper
        onClick={() => {
          showPhotoGallery({
            items,
            mediaId,
            title,
          })
        }}
      >
        {children}
      </StyledWrapper>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  title: R.pathOr(
    R.pathOr('', ['account', 'profile', 'author', 'name'], state),
    ['story', 'article', 'details', 'title'],
    state
  ),
  isShowGallery: R.pathOr(false, ['ui', 'isShowGallery'], state),
})

const mapDispatchToProps = {
  showPhotoGallery: uiCreators.showPhotoGalleryView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGalleryToggleWrapper)
