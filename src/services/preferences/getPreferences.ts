import * as R from 'ramda'
import localStorage from 'src/services/storage/localStorage'

import { PREFERENCES_KEY } from './'

export const getPreferences = () => {
  const json = localStorage.getItem(PREFERENCES_KEY)
  if (R.either(R.isNil, R.isEmpty)(json)) {
    return {}
  } else {
    try {
      return JSON.parse(json || '{}')
    } catch (e) {
      return {}
    }
  }
}
