declare global {
  interface Window {
    fbAsyncInit: Function
  }
}

const fbSDK = () => {
  window.fbAsyncInit = function() {
    FB.init({
      appId: process.env.FBID || '',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.2',
    })
  }
  // load fb sdk to the project by insert the following script to the first of <head>
  // <script id="facebook-jssdk" src="https://connect.facebook.net/zh_HK/sdk.js" async=""></script>
  ;(function(d, s, id) {
    var js: HTMLScriptElement,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement<'script'>('script')
    js.id = id
    js.src = 'https://connect.facebook.net/zh_HK/sdk.js'
    js.async = true
    fjs.parentNode && fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

export default fbSDK
