import React, { PureComponent } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import { compose } from 'redux'
import StoryList from 'src/components/StoryList'
import EmptyContent from 'src/containers/AccountBody/EmptyContent'
import { ApplicationState } from 'src/redux'
import { accountActionCreators } from 'src/redux/account'
import { LayoutSettings, Pagination, Story } from 'src/types'
import styled from 'styled-components'

const StyledAccountStoryList = styled.div`
  margin: 16px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 24px 0;
  }
`

type ComponentProps = {
  accountId: string
  layout: LayoutSettings['listingLayout']
}

type Props = WithTranslation &
  ComponentProps & {
    isFetching: boolean
    list: Story[]
    pagination: Pagination | null
    fetchNextStoryListRequest: (accountId: string, pageToken: string) => void
  }

class AccountStoryList extends PureComponent<Props> {
  onLoadMore = () => {
    const {
      accountId,
      pagination,
      fetchNextStoryListRequest,
      isFetching,
    } = this.props
    if (pagination && pagination.nextPageToken && !isFetching) {
      fetchNextStoryListRequest(accountId, pagination.nextPageToken)
    }
  }
  renderEmptyContent() {
    const { t } = this.props

    return <EmptyContent description={t('containers.account_body.empty.all')} />
  }
  renderStoryList() {
    const { layout, list, pagination, isFetching } = this.props
    return (
      <StyledAccountStoryList>
        <InfiniteScroll
          loadMore={this.onLoadMore}
          hasMore={!!pagination && pagination.hasMore}
          threshold={100}
        >
          <StoryList
            stories={list}
            layout={layout}
            isFetching={isFetching}
            numberOfSkeleton={6}
          />
        </InfiniteScroll>
      </StyledAccountStoryList>
    )
  }
  render() {
    const { list, isFetching } = this.props
    if (!isFetching && list.length <= 0) {
      return this.renderEmptyContent()
    } else {
      return this.renderStoryList()
    }
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.account.storyList.isFetching,
  list: state.account.storyList.list,
  pagination: state.account.storyList.pagination,
})

const mapDispatchToProps = {
  fetchNextStoryListRequest: accountActionCreators.fetchNextStoryListRequest,
}

export default compose<React.ComponentClass<ComponentProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation()
)(AccountStoryList)
