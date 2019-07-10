import { LinkProps } from 'next/link'
import { WithRouterProps, withRouter } from 'next/router'
import * as R from 'ramda'
import React, { PureComponent } from 'react'
import ScrollableTabLink from 'src/components/ScrollableTabLink'
import styled from 'styled-components'
import { Omit } from 'type-fest'

type Props = {
  themeColor?: string
  items?: Item[]
  isWebView: boolean
} & WithRouterProps

type State = {
  sticky: boolean
  offset: number
}

type Item = {
  key: string
  text: string
  linkProps: Omit<LinkProps, 'children'>
  active?: boolean
}

const HeaderHeight = [44, 60]

const StyledAccountTabs = styled.div<{ isWebView: boolean }>`
  border-top: 1px solid #e8e6e6;
  background-color: #ffffff;
  position: sticky;
  top: ${({ isWebView }) => (isWebView ? 0 : HeaderHeight[0])}px;
  z-index: 200;
  :after {
    content: '';
    display: block;
    border: inherit;
    bottom: 0px;
    width: 100%;
    position: absolute;
    z-index: -1;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    top: ${({ isWebView }) => (isWebView ? 0 : HeaderHeight[1])}px;
  }
`

const StyledInner = styled.div`
  padding-right: 40px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-right: 0px;
    margin: 0 16px;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 872px;
    margin: 0 auto;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: 1136px;
  }
`

const StyledTabsSelectButton = styled.div`
  width: 40px;
  height: calc(100% - 1px);
  background: #ffffff url('/static/images/ico-menu.svg') center no-repeat;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  :after {
    content: '';
    width: 40px;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: -50%;
    background-image: radial-gradient(
      circle at 80% 50%,
      rgba(0, 0, 0, 0.08),
      rgba(255, 255, 255, 0)
    );
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: none;
  }
`

const StyledTabsSelectWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StyledTabsSelect = styled.select`
  position: absolute;
  -webkit-appearance: none;
  outline: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0;
  opacity: 0;
  cursor: pointer;
  overflow: hidden; /* iOS safari will have extra space when select an option which contains emoji */
`

const TabLinkSkeleton = styled.div`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.palette.skeleton};
`

class AccountTabs extends PureComponent<Props, State> {
  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const { items, router } = this.props
    if (R.isNil(items)) return
    const targetItem = items.find(item => item.key === event.target.value)

    if (targetItem && targetItem.linkProps.href && router) {
      router.replace(targetItem.linkProps.href, targetItem.linkProps.as)
    }
  }

  renderSelect() {
    const { items } = this.props
    if (R.isNil(items)) return null
    const activeItem = items.find(item => item.active === true)
    return (
      <StyledTabsSelectButton>
        <StyledTabsSelectWrap>
          <StyledTabsSelect
            value={activeItem && activeItem.key}
            onChange={this.handleSelectChange}
          >
            {items.map(item => (
              <option key={item.key} value={item.key}>
                {item.text}
              </option>
            ))}
          </StyledTabsSelect>
        </StyledTabsSelectWrap>
      </StyledTabsSelectButton>
    )
  }

  renderTabLinks() {
    const { themeColor, items } = this.props
    if (R.isNil(items)) return <TabLinkSkeleton />
    return <ScrollableTabLink themeColor={themeColor} items={items} />
  }

  render() {
    const { isWebView } = this.props
    return (
      <StyledAccountTabs isWebView={isWebView}>
        <StyledInner>
          {this.renderTabLinks()}
          {this.renderSelect()}
        </StyledInner>
      </StyledAccountTabs>
    )
  }
}

export default withRouter(AccountTabs)
