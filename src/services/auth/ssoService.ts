import localStorage from 'src/services/storage/localStorage'
import webJsSdkService from 'src/services/webJsSdk/webJsSdkService'

class SsoService {
  static MOCK_TOKEN_KEY = 'local_mock_pms_token'
  status?: {
    accessToken: string
    refreshToken: string
    expire: number
  }

  private isAccessTokenExpired = () => {
    if (!this.status) {
      throw new Error('SSO access token does not exists')
    }
    // NOTE: token expire time is in second, but date in javascript is in ms.
    //       We need to divide date by 1000
    const nowInSecond = +new Date() / 1000
    return this.status.expire < nowInSecond
  }
  private refreshAccessToken = async () => {
    if (!this.status) {
      throw new Error('SSO refresh token does not exists')
    }
    const {
      response: { accessToken, refreshToken, expire },
    } = await webJsSdkService.refresh(this.status.refreshToken)
    this.status = { accessToken, refreshToken, expire }
  }
  // make sure access token returned is valid
  private getAccessToken = async () => {
    if (!this.status) {
      const {
        response: { accessToken, refreshToken, expire },
      } = await webJsSdkService.getLoginStatus()
      this.status = { accessToken, refreshToken, expire }
    }
    if (this.isAccessTokenExpired()) {
      this.refreshAccessToken()
    }
    return this.status.accessToken
  }

  getStatus = async () => {
    const { status } = await webJsSdkService.getLoginStatus()
    return status
  }
  getTokens = async () => {
    const accessToken = await this.getAccessToken()
    const tokens = await webJsSdkService.getTokens(accessToken)
    // TODO: remove the testing stub, use mock pua token to override real token
    const mockPuaToken = localStorage.getItem(SsoService.MOCK_TOKEN_KEY)
    if (mockPuaToken) {
      tokens.pua = { token: mockPuaToken }
    }
    return tokens
  }
  login = async (redirectUrl: string) => {
    return webJsSdkService.login(redirectUrl)
  }
  logout = webJsSdkService.logout
  setMockPmsToken = (token: string) => {
    localStorage.setItem(SsoService.MOCK_TOKEN_KEY, token)
  }
  deleteMockPmsToken = () => {
    localStorage.removeItem(SsoService.MOCK_TOKEN_KEY)
  }
}

export default new SsoService()
