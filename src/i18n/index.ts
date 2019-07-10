import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import zhHK from './locales/zh-HK.json'

i18n.use(initReactI18next).init({
  lng: 'zh-HK',
  fallbackLng: 'zh-HK',
  resources: {
    'zh-HK': {
      translation: zhHK,
    },
  },
})

export default i18n
