import * as R from 'ramda'
import React from 'react'
import AuthorName from 'src/components/AuthorName'
import Link from 'src/components/Link'
import ProfilePicture from 'src/components/ProfilePicture'
import FollowButton from 'src/containers/FollowButton'
import { Author } from 'src/types'
import styled from 'styled-components'

type Props = {
  author?: Author
}

const StyledStoryAuthor = styled.div`
  align-items: center;
  color: #1f253d;
  display: flex;
`

const StyledProfilePictureWrapper = styled.div`
  flex: 0 0 32px;
  height: 32px;
  margin-right: 8px;
  width: 32px;
`

const StyledProfilePicture = styled(ProfilePicture)`
  border: none;
`

const StyledAthorName = styled.div`
  color: #1f253d;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin-right: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  > a {
    text-decoration: none;
    color: inherit;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 18px;
  }
`

const StoryAuthor = ({ author }: Props) => {
  if (!author) return null
  return (
    <StyledStoryAuthor>
      <StyledProfilePictureWrapper>
        <StyledProfilePicture
          puaId={author._id}
          src={R.propOr(null, 'avatar', author)}
          verified={R.propOr(false, 'isVerified', author)}
        />
      </StyledProfilePictureWrapper>
      <StyledAthorName>
        <Link
          href={`/account?accountId=${author._id}&tab=all`}
          as={`/account/${author._id}/all`}
        >
          <a>
            <AuthorName name={author.name} />
          </a>
        </Link>
      </StyledAthorName>
      <FollowButton
        accountId={author._id}
        accountName={author.name}
        accountAvatar={R.propOr(null, 'avatar', author)}
      />
    </StyledStoryAuthor>
  )
}

export default StoryAuthor
