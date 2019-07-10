import localStorage from 'src/services/storage/localStorage'
import { Preferences } from 'src/types'

import { PREFERENCES_KEY } from './'

export const setPreferences = (preferences: Partial<Preferences>) => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
}
