import * as R from 'ramda'
import React, { PureComponent } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'redux'
import BaseButton from 'src/components/BaseButton'
import UnfollowModalConfirmation from 'src/components/UnfollowModalConfirmation'
import { ApplicationState } from 'src/redux'
import { authActionCreators } from 'src/redux/auth'
import { UserFollowStatus, followActionCreators } from 'src/redux/follow'
import styled from 'styled-components'

const { HOST_URL } = process.env

type ComponentProps = {
  themeColor?: string
  accountId: string
  accountName: string
  accountAvatar: string | null
  textOnly?: boolean
  className?: string
  onFollowSuccess?: () => void
  onUnfollowSuccess?: () => void
}

type ContainerProps = {
  myPuaId: string | null
  followStatus: UserFollowStatus
  login: (redirectUrl?: string) => void
  follow: (accountId: string, callback?: () => void) => void
}

type Props = ComponentProps & ContainerProps & WithTranslation

const StyledFollowButton = styled(BaseButton)<{
  themeColor?: string
  isFollowing: boolean
}>`
  background-color: ${({ theme, themeColor, isFollowing }) =>
    isFollowing ? '#ffffff' : themeColor || theme.palette.mainTheme};
  border: solid 1px
    ${({ theme, themeColor, isFollowing }) =>
      isFollowing ? '#e6e6e6' : themeColor || theme.palette.mainTheme};
  color: ${({ isFollowing }) =>
    isFollowing ? 'rgba(0, 0, 0, 0.78)' : '#ffffff'};

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 92px;
  }
`

const StyledFollowIcon = styled.span`
  background: center no-repeat;
  background-image: url('/static/images/ico-follow.svg');
  background-size: contain;
  height: 13px;
  margin-right: 4px;
  width: 13px;
`

const LoadingSpinner = styled.div`
  background: url('/static/images/ico-spinner-invert.svg') center no-repeat;
  background-size: contain;
  height: 16px;
  width: 16px;
`

type State = {
  isModalVisible: boolean
}

class FollowButton extends PureComponent<Props, State> {
  static defaultProps = {
    textOnly: false,
  }

  state = {
    isModalVisible: false,
  }

  isFollowing = () => {
    const { accountId, followStatus } = this.props

    return R.pathOr(false, [accountId, 'isFollowing'], followStatus)
  }

  isRequestingFollow = () => {
    const { accountId, followStatus } = this.props

    return R.pathOr(false, [accountId, 'isRequesting'], followStatus)
  }

  handleOnFollowButtonClick = () => {
    const { accountId, onFollowSuccess, follow, myPuaId, login } = this.props
    const { pathname, hash } = window.location
    const loginRedirectUrl = pathname + hash

    if (!myPuaId) {
      return login(HOST_URL + loginRedirectUrl)
    } else {
      return this.isFollowing()
        ? this.handleUnfollowButtonClick()
        : follow(accountId, onFollowSuccess)
    }
  }

  handleUnfollowButtonClick = () => {
    this.setState({
      isModalVisible: true,
    })
  }

  renderButtonContent() {
    const { t, textOnly } = this.props

    return (
      <React.Fragment>
        {!this.isFollowing() && !textOnly && <StyledFollowIcon />}
        <span>
          {this.isFollowing() ? t('buttons.following') : t('buttons.follow')}
        </span>
      </React.Fragment>
    )
  }

  render() {
    const { isModalVisible } = this.state
    const {
      themeColor,
      accountId,
      accountName,
      accountAvatar,
      className,
      myPuaId,
      onUnfollowSuccess,
    } = this.props

    return (
      <React.Fragment>
        {myPuaId !== accountId && (
          <StyledFollowButton
            themeColor={themeColor}
            isFollowing={this.isFollowing()}
            onClick={this.handleOnFollowButtonClick}
            className={className}
            disabled={this.isRequestingFollow()}
          >
            {/* Todo: Confirm spinner image since spinner image is grey and won't be seen clearly when
         background is white */}
            {this.isRequestingFollow() ? (
              <LoadingSpinner />
            ) : (
              this.renderButtonContent()
            )}
          </StyledFollowButton>
        )}

        {/* Unfollow confirmation modal */}
        {isModalVisible && (
          <UnfollowModalConfirmation
            accountId={accountId}
            accountName={accountName}
            accountAvatar={accountAvatar}
            isVisible={isModalVisible}
            onUnfollowSuccess={onUnfollowSuccess}
            onClose={() => this.setState({ isModalVisible: false })}
          />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  myPuaId: R.pathOr(null, ['auth', 'profile', 'puaId'], state),
  followStatus: R.pathOr({}, ['follow', 'users'], state),
})

const mapDispatchToProps = {
  login: authActionCreators.login,
  follow: followActionCreators.followRequest,
}

export default compose<React.ComponentClass<ComponentProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation()
)(FollowButton)
