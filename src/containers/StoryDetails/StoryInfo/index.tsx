import { format, parse } from 'date-fns'
import React, { PureComponent } from 'react'
import settings from 'src/constants/settings'
import { Story } from 'src/types'
import styled from 'styled-components'

import StoryAuthor from '../StoryAuthor'

type Props = {
  story?: Story
}

const StyledTime = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  margin-top: 12px;
`

const StyledIconTime = styled.div`
  width: 16px;
  height: 16px;
  background: url('/static/images/ico-time-dim.svg') center no-repeat;
  background-size: contain;
  margin-right: 8px;
`

class StoryInfo extends PureComponent<Props> {
  renderSkeleton() {
    // TODO: render skeloton
    return <></>
  }
  renderStoryInfo() {
    const { story } = this.props

    if (!story) return null

    const { author } = story
    const formatDate = format(
      parse(story.firstPublishTime),
      settings.timeFormat
    )

    return (
      <>
        <StoryAuthor author={author} />
        <StyledTime>
          <StyledIconTime />
          <div>{formatDate}</div>
        </StyledTime>
      </>
    )
  }
  render() {
    return this.props.story ? this.renderStoryInfo() : this.renderSkeleton()
  }
}

export default StoryInfo
