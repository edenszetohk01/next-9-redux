import settings from 'src/constants/settings'

import { getPreferences } from './getPreferences'
import { setPreferences } from './setPreferences'

export const PREFERENCES_KEY = `${settings.localStoragePrefix}USER_PREFERENCES`

export default {
  getPreferences,
  setPreferences,
}
