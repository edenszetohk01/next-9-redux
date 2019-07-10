import copy from 'copy-to-clipboard'

export const shareFacebook = () => {
  FB.ui(
    {
      method: 'share',
      href: window.location.href,
    },
    () => {
      //can be used to detect if user shared or cancelled
    }
  )
}

export const shareWhatsApp = (title: string) => () => {
  const href = encodeURIComponent(`${title} ${window.location.href}`)
  window.open('https://api.whatsapp.com/send?text=' + href, '_blank')
}

export const copyUrl = (successMsg: string) => () => {
  const href = unescape(window.location.href)

  const isSuccess = copy(href)
  if (isSuccess) {
    window.alert(successMsg)
  }
}
