import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PhotoGalleryToggleWrapper } from 'src/containers/PhotoGallery'
import { BreakWord } from 'src/css/helper'
import { ApplicationState } from 'src/redux'
import { Story } from 'src/types'
import { NodeJSON } from 'src/utils/hk01EditorUtils'
import styled from 'styled-components'

import StoryContent from './StoryContent'
import StoryInfo from './StoryInfo'

const StyledPhotoGalleryToggleWrapper = styled(PhotoGalleryToggleWrapper)`
  margin: 0 -16px 24px -16px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0 0 32px 0;
  }
`

const StyledHeader = styled.h1`
  color: rgba(0, 0, 0, 0.78);
  font-size: 28px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.4;
  margin: 0 0 12px 0;
  ${BreakWord}

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    line-height: 1.29;
    margin-bottom: 16px;
  }
`

const StyledStoryInforWrap = styled.div`
  margin-bottom: 24px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-bottom: 32px;
  }
`

const CoverWrapper = styled.div`
  margin-bottom: 24px;
  margin-left: -16px;
  margin-right: -16px;
  > img {
    display: block;
    width: 100%;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-bottom: 32px;
    margin-left: 0;
    margin-right: 0;
  }
`

const StyledStoryContentWrapper = styled.div<{ fontSizeIndex: number }>`
  font-size: ${({ theme, fontSizeIndex }) => theme.fontSizes[fontSizeIndex]};
  word-wrap: break-word;
  white-space: pre-wrap;

  figcaption {
    font-size: ${({ theme, fontSizeIndex }) =>
      `calc(${theme.fontSizes[fontSizeIndex]} - 4px)`};
  }
`

type Props = {
  storyDetails?: Story
  fontSizeIndex: number
  nodes: NodeJSON[]
}

// As preview is on demand, we set the current time as publish time
const setPublishTime = (storyDetails: Story) => {
  if (!storyDetails.firstPublishTime) {
    const currentTime = new Date()
    storyDetails.firstPublishTime = currentTime.toISOString()
  }
}

class StoryDetails extends PureComponent<Props> {
  renderSkeleton() {
    // TODO: render skeleton
    return <></>
  }
  renderStoryDetails() {
    const { storyDetails, fontSizeIndex, nodes } = this.props
    if (!storyDetails) return null

    setPublishTime(storyDetails)

    return (
      <>
        <StyledHeader>{storyDetails.title}</StyledHeader>
        <StyledStoryInforWrap>
          <StoryInfo story={storyDetails} />
        </StyledStoryInforWrap>
        {!!storyDetails.covers.length && (
          <StyledPhotoGalleryToggleWrapper
            mediaId={storyDetails.covers[0].mediaId}
            items={[storyDetails.covers[0]]}
          >
            <CoverWrapper>
              <img src={storyDetails.covers[0].urls.default} />
            </CoverWrapper>
          </StyledPhotoGalleryToggleWrapper>
        )}
        <StyledStoryContentWrapper fontSizeIndex={fontSizeIndex}>
          <StoryContent nodes={nodes} />
        </StyledStoryContentWrapper>
      </>
    )
  }
  render() {
    return this.props.storyDetails
      ? this.renderStoryDetails()
      : this.renderSkeleton()
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  fontSizeIndex: state.preferences.fontSizeIndex,
})

export default connect(mapStateToProps)(StoryDetails)
