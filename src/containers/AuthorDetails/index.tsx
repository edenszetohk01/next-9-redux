import Link from 'next/link'
import * as R from 'ramda'
import React from 'react'
import AuthorName from 'src/components/AuthorName'
import ProfilePicture from 'src/components/ProfilePicture'
import FollowButton from 'src/containers/FollowButton'
import OtherArticles from 'src/containers/OtherArticles'
import { Author } from 'src/types'
import styled from 'styled-components'

type Props = {
  author?: Author
}

const StyledAuthorInfo = styled.div`
  align-items: center;
  color: #1f253d;
  display: flex;
`

const StyledAuthorOtherArticles = styled.div`
  margin-top: 24px;
`

const StyledProfilePictureWrapper = styled.div`
  flex: 0 0 52px;
  height: 52px;
  width: 52px;
  margin-right: 8px;
`

const StyledProfilePicture = styled(ProfilePicture)`
  border: 2px solid #ffffff;
`

const StyledAthorName = styled.div`
  color: #1f253d;
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  margin-right: 8px;
  overflow: hidden;
  > a {
    text-decoration: none;
    color: inherit;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 48px;
  }
`

const StyledFollowButton = styled(FollowButton)`
  width: 72px;
`

const AuthorDetails = ({ author }: Props) => {
  if (!author) return null
  return (
    <>
      <StyledAuthorInfo>
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
        <StyledFollowButton
          accountId={author._id}
          accountName={author.name}
          accountAvatar={R.propOr(null, 'avatar', author)}
        />
      </StyledAuthorInfo>
      <StyledAuthorOtherArticles>
        <OtherArticles />
      </StyledAuthorOtherArticles>
    </>
  )
}

export default AuthorDetails
