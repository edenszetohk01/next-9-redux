import * as R from 'ramda'

export const myPuaIdSelector = R.pathOr(null, ['auth', 'profile', 'puaId'])
