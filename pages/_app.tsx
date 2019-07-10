import '../src/i18n'

import withReduxSaga from 'next-redux-saga'
import withRedux from 'next-redux-wrapper'
import App, { AppContext, Container } from 'next/app'
import Router from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { Provider } from 'react-redux'
import theme from 'src/constants/theme'
import { NextStore, getStore } from 'src/redux'
import { setupActionCreators } from 'src/redux/setup'
import fbSDK from 'src/utils/FbSDK'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { version } from '../package.json'

type InitialPropsContext = {
  ctx: {
    store: NextStore
  }
} & AppContext

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: sans-serif;
    min-width: 320px;
    font-family: PingFangHK-Regular, sans-serif;
  }
`

class MyApp extends App<{ store: NextStore }> {
  static async getInitialProps(context: InitialPropsContext) {
    const { Component, ctx } = context
    const isInitialPageLoad = typeof window === 'undefined'

    const { store } = ctx

    let pageProps = {}

    const {
      setup: { pathname },
    } = await store.getState()

    const previousPathname = context.router.asPath
    const isSamePath = previousPathname === pathname
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(
        R.merge(ctx, { isSamePath, isInitialPageLoad })
      )
    }

    const userAgent = ctx.req
      ? ctx.req.headers['user-agent']
      : navigator.userAgent

    const isWebView = R.test(/app\/com\.hk01\.news[_-]?app/, userAgent || '')

    return {
      pageProps: R.merge(pageProps, {
        isWebView,
        isSamePath,
        isInitialPageLoad,
      }),
    }
  }

  componentDidMount() {
    if (window) fbSDK()
    this.props.store.dispatch(setupActionCreators.setPathname(Router.asPath))
    Router.events.on('routeChangeStart', this.handleRouteChange)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouteChange)
  }

  handleRouteChange = (url: string) => {
    this.props.store.dispatch(setupActionCreators.setPathname(url))
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyle />
            <Component {...pageProps} />
            <div id='modal-root' />
          </Provider>
        </ThemeProvider>
      </Container>
    )
  }
}

declare global {
  interface Window {
    __HK01_APP_DATA__: object
  }
}

if (typeof window !== 'undefined') {
  window.__HK01_APP_DATA__ = {
    VERSION: version,
    TRAVIS_BRANCH: process.env.REACT_APP_TRAVIS_BRANCH || '',
    TRAVIS_BUILD_NUMBER: process.env.REACT_APP_TRAVIS_BUILD_NUMBER || '',
    TRAVIS_COMMIT: process.env.REACT_APP_TRAVIS_COMMIT || '',
    TRAVIS_TIMESTAMP: process.env.REACT_APP_TRAVIS_TIMESTAMP || '',
  }
}

export default withRedux(getStore)(withReduxSaga(MyApp))
