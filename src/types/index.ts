export type ErrorType = Error & {
  errorCode: string
}

export type Story = {
  _id: StoryId
  title: string
  firstPublishTime: string
  author: Author
  components: Component[]
  covers: ImageObject[]
  thumbnails: ImageObject[]
  summary: string
}

export type StoryId = string

export type CustomStoryList = {
  description: null
  _id: StoryId
  stories: string[]
  author: Author['_id']
  name: string
  createTime: string
  lastModifyTime: string
  firstPublishTime: string
  lastPublishTime: string
}

export type Author = {
  _id: string
  accountId: string
  name: string
  tagline?: string
  introduction?: string
  avatar?: string
  cover?: ImageObject
  customStoryLists?: CustomStoryList[]
  isVerified?: boolean
  pageLayoutSetting?: LayoutSettings
  followerCount: number
  followingCount: number
  isFollowing?: boolean
}

export type FollowAuthor = Pick<
  Author,
  | '_id'
  | 'accountId'
  | 'name'
  | 'tagline'
  | 'isFollowing'
  | 'avatar'
  | 'isVerified'
>

export type LayoutSettings = {
  themeColor: string
  listingLayout: 'staggered' | 'standard' | 'list'
}

export type Component = {
  _id: string
  code: string
  data: object
}

export type Preferences = {
  fontSizeIndex: 0 | 1 | 2
}

export type ImageObject = {
  mediaId: string
  width: number
  height: number
  caption?: string
  urls: {
    thumbnail_4_3: string
    original: string
    large: string
    small: string
    default: string
  }
}

export type Pagination = {
  hasMore: boolean
  nextPageToken: string | null
}

export type ErrorResponse = {
  errorCode: string
  name: string
  message: string
  httpStatus: number
}
