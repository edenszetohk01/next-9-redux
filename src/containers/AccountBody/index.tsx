import * as R from 'ramda'
import React, { PureComponent } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Author } from 'src/types'
import styled from 'styled-components'

import AccountAbout from './AccountAbout'
import AccountStoryList from './AccountStoryList'
import AccountTabs from './AccountTabs'

const PAGE_TABS = ['all', 'about', 'list']

type Props = {
  accountId: string
  author?: Author
  tab: 'all' | 'about' | 'list'
  listId?: string
  isWebView: boolean
} & WithTranslation

const StyledAccountTabBody = styled.div`
  padding: 0 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0;
    width: 872px;
    margin: 0 auto;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: 1136px;
  }
`

class AccountBody extends PureComponent<Props> {
  componentWillMount() {
    // Only check tab's validation when page load
    const { tab, listId } = this.props
    const isValidTab = PAGE_TABS.some(t => t === tab)
    if (!isValidTab || (tab === 'list' && R.isNil(listId))) {
      // TODO: handle not found error
      console.log('not found')
    }
  }

  getTabItems() {
    const { accountId, tab, listId, author, t } = this.props
    const tabs = [
      {
        key: 'all',
        text: t('containers.account_body.all'),
        linkProps: {
          href: `/account?accountId=${accountId}&tab=all`,
          as: `/account/${accountId}/all`,
        },
        active: tab === 'all',
      },
    ]
    if (author && author.customStoryLists) {
      author.customStoryLists.forEach(list => {
        tabs.push({
          key: list._id,
          text: list.name,
          linkProps: {
            href: `/account?accountId=${accountId}&tab=list&listId=${list._id}`,
            as: `/account/${accountId}/list/${list._id}`,
          },
          active: tab === 'list' && listId === list._id,
        })
      })
    }
    tabs.push({
      key: 'about',
      text: t('containers.account_body.about'),
      linkProps: {
        href: `/account?accountId=${accountId}&tab=about`,
        as: `/account/${accountId}/about`,
      },
      active: tab === 'about',
    })
    return tabs
  }

  renderTabs() {
    const { author, isWebView } = this.props
    // no items means skeleton
    if (R.isNil(author)) return <AccountTabs isWebView={isWebView} />
    return (
      <AccountTabs
        themeColor={R.path(['pageLayoutSetting', 'themeColor'], author)}
        items={this.getTabItems()}
        isWebView={isWebView}
      />
    )
  }

  renderTabBody() {
    const { tab, accountId, author } = this.props
    switch (tab) {
      case 'about':
        return (
          <AccountAbout introduction={R.propOr(null, 'introduction', author)} />
        )
      case 'all':
      case 'list':
        return (
          <AccountStoryList
            accountId={accountId}
            layout={R.pathOr(
              'standard',
              ['pageLayoutSetting', 'listingLayout'],
              author
            )}
          />
        )
    }
  }

  render() {
    return (
      <>
        {this.renderTabs()}
        <StyledAccountTabBody>{this.renderTabBody()}</StyledAccountTabBody>
      </>
    )
  }
}

export default withTranslation()(AccountBody)
