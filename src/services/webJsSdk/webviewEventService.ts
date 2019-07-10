import { Nothing } from 'nothing-mock'

const { EVENT_ENUMS, isSupportedApp, requestAndWait } =
  typeof window !== 'undefined'
    ? require('@hk01-digital/react-native-webview-events/cjs/web')
    : Nothing

export const navigateGoBack = async () => {
  window.history.back()
  if (isSupportedApp()) {
    await requestAndWait({
      type: EVENT_ENUMS.NAVIGATE_GO_BACK,
    })
  }
}
