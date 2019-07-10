import * as R from 'ramda'
const { HK01_SSO_APP_ID } = process.env

class WebJsSdkService {
  // Singleton, we only need on web js sdk instance
  static webJsSdk: any
  getSdk = async () => {
    // Cannot use process.browser in typescript: https://dev.to/dala00/nuxtjsssr-2jda
    if (typeof window === 'undefined') {
      throw new Error('Cannot get web-js-sdk during server side rendering')
    }
    if (!WebJsSdkService.webJsSdk) {
      let WebJsSdk
      if (process.env.APP_ENV === 'production') {
        WebJsSdk = (await import('@hk01-digital/web-js-sdk')).default
      } else {
        WebJsSdk = (await import('@hk01-digital/web-js-sdk/dist/stg/esm'))
          .default
      }
      WebJsSdkService.webJsSdk = new WebJsSdk({
        appId: HK01_SSO_APP_ID,
      })
    }
    return WebJsSdkService.webJsSdk
  }

  getLoginStatus = async () => {
    const sdk = await this.getSdk()
    return sdk.auth.getLoginStatus()
  }

  getTokens = async (accessToken: string) => {
    const sdk = await this.getSdk()
    const tokens = await sdk.auth.getTokens(accessToken)
    return tokens
  }

  refresh = async (refreshToken: string) => {
    const sdk = await this.getSdk()
    return sdk.auth.refresh(refreshToken)
  }

  login = async (url: string) => {
    const sdk = await this.getSdk()
    sdk.auth.login(url, () => {
      window.location.reload()
    })
  }

  logout = async () => {
    const sdk = await this.getSdk()
    sdk.auth.logout()
  }

  showShareDialog = async (message: string, url: string, title: string) => {
    const sdk = await this.getSdk()
    sdk.app.showShareDialog(message, url, title)
  }

  goto = async (url: string) => {
    const sdk = await this.getSdk()
    const hostname = new URL(url).hostname

    if (
      sdk.isPlatform(sdk.PLATFORM.WEBVIEW) &&
      !R.equals(hostname, window.location.hostname)
    ) {
      sdk.app.goTo(url)
    } else {
      window.open(url)
    }
  }

  isWebview = async () => {
    const sdk = await this.getSdk()
    return sdk.getPlatform() === 'webview'
  }
}

export default new WebJsSdkService()
