import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

// @ts-ignore
export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(context)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  // TODO: Only include photoswipe css when required
  render() {
    return (
      <html>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, viewport-fit=cover,  initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
          />
          <link
            rel='stylesheet'
            type='text/css'
            href='/static/photoswipe/photoswipe.css'
          />
          {process.env.NODE_ENV !== 'production' && (
            <meta name='robots' content='NOINDEX, NOFOLLOW' />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
