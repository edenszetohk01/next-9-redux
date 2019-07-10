import React, { PureComponent } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'redux'
import StoryList from 'src/components/StoryList'
import { ApplicationState } from 'src/redux'
import { Story } from 'src/types'
import styled from 'styled-components'

type Props = {
  list: Story[]
  isFetching: boolean
} & WithTranslation

const StyledRelatedArticle = styled.section`
  border-top: 2px solid ${({ theme }) => theme.palette.mainTheme};
  background-color: #f6f6f6;
  padding: 24px 16px 0 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border-top: none;
    background-color: transparent;
    padding: 24px 0 0 0;
    margin: 0 16px;
    border-top: 1px solid #e6e7e8;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    max-width: 872px;
    padding: 24px 16px 0 16px;
    margin: 0 auto;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    max-width: 1136px;
  }
`

const StyledH3 = styled.h3`
  font-family: PingFangHK-Medium, sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.78);
  margin: 0 0 16px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    letter-spacing: 0.8px;
  }
`

class RelatedArticle extends PureComponent<Props> {
  render() {
    const { list, isFetching, t } = this.props
    return (
      <StyledRelatedArticle>
        <StyledH3>{t('containers.related_articles.title')}</StyledH3>
        <StoryList stories={list} isFetching={isFetching} layout={'standard'} />
      </StyledRelatedArticle>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  list: state.story.relatedArticles.list,
  isFetching: state.story.relatedArticles.isFetching,
})

export default compose(
  connect(mapStateToProps),
  withTranslation()
)(RelatedArticle)
