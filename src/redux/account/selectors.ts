import * as R from 'ramda'

export const followingPaginationSelector = R.path([
  'account',
  'following',
  'pagination',
])

export const followersPaginationSelector = R.path([
  'account',
  'followers',
  'pagination',
])
