import Link from 'next/link'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import StoryCard from 'src/components/StoryList/StoryCard'
import TextSkeleton from 'src/components/TextSkeleton'
import { BreakWord } from 'src/css/helper'
import { ApplicationState } from 'src/redux'
import { Story } from 'src/types'
import styled from 'styled-components'

type Props = {
  list: Story[]
  isFetching: boolean
}

const StyledListViewInner = styled.div`
  margin-bottom: 16px;
  :last-child {
    margin-bottom: 0;
  }
`

const StyledListViewWrapper = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: block;
  }
`

const StyledTitleViewWrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }
`

const StyledTitleViewInner = styled.div`
  margin-bottom: 16px;
  :last-child {
    margin-bottom: calc(40px - 16px);
  }
  a {
    font-size: 18px;
    line-height: 1.56;
    letter-spacing: 0.5px;
    color: #1745ef;
    text-decoration: underline;
    ${BreakWord}
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    a {
      letter-spacing: 1px;
    }
  }
`

class OtherArticle extends PureComponent<Props> {
  renderListView() {
    const { list } = this.props
    return (
      <StyledListViewWrapper>
        {list.map(story => (
          <StyledListViewInner key={story._id}>
            <StoryCard story={story} layout={'other'} />
          </StyledListViewInner>
        ))}
      </StyledListViewWrapper>
    )
  }
  renderTitleView() {
    const { list } = this.props
    return (
      <StyledTitleViewWrapper>
        {list.map(story => (
          <StyledTitleViewInner key={story._id}>
            <Link
              href={`/story?storyId=${story._id}`}
              as={`/story/${story._id}`}
            >
              <a>{story.title}</a>
            </Link>
          </StyledTitleViewInner>
        ))}
      </StyledTitleViewWrapper>
    )
  }
  renderListViewSkeleton() {
    return (
      <StyledListViewWrapper>
        <StyledListViewInner>
          <TextSkeleton line={4} lastLineExtraSpace={false} />
        </StyledListViewInner>
        <StyledListViewInner>
          <TextSkeleton line={4} lastLineExtraSpace={false} />
        </StyledListViewInner>
        <StyledListViewInner>
          <TextSkeleton line={4} lastLineExtraSpace={false} />
        </StyledListViewInner>
      </StyledListViewWrapper>
    )
  }
  renderTitleViewSkeleton() {
    return (
      <StyledTitleViewWrapper>
        <StyledTitleViewInner>
          <TextSkeleton line={1} />
        </StyledTitleViewInner>
        <StyledTitleViewInner>
          <TextSkeleton line={1} />
        </StyledTitleViewInner>
        <StyledTitleViewInner>
          <TextSkeleton line={1} />
        </StyledTitleViewInner>
      </StyledTitleViewWrapper>
    )
  }
  render() {
    const { isFetching } = this.props
    return (
      <div>
        {!isFetching ? this.renderListView() : this.renderListViewSkeleton()}
        {!isFetching ? this.renderTitleView() : this.renderTitleViewSkeleton()}
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  list: state.story.relatedArticleOfAuthor.list,
  isFetching: state.story.relatedArticleOfAuthor.isFetching,
})

export default connect(mapStateToProps)(OtherArticle)
