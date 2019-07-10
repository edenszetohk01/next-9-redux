import * as R from 'ramda'
import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Avatar from 'src/components/Avatar'
import ActionButton from 'src/components/global/ActionButton'
import HeaderButton from 'src/components/global/Header/HeaderButton'
import ProfileMenu from 'src/containers/LoginButton/ProfileMenu'
import { ApplicationState } from 'src/redux'
import { LogInStatusType, authActionCreators } from 'src/redux/auth'
import { loginStatusSelector } from 'src/redux/selectors'
import { isPreviewSelector } from 'src/redux/story'
import styled from 'styled-components'

type Props = WithTranslation & {
  loginStatus: LogInStatusType
  profile?: {
    puaId: string
    avatar: string
  }
  login: (redirectUrl?: string) => void
  isPreview?: boolean
}

type State = {
  displayMenu: boolean
}

const ProfileButtonWrapper = styled.div`
  height: 100%;
  max-width: 1280px;
  position: relative;
`

const ProfileButton = styled(ActionButton)`
  cursor: default;
  padding: 0 0 0 6px;
  height: 100%;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0 0 0 12px;
  }
`

const ProfileAvatar = styled(Avatar)`
  cursor: pointer;
  height: 24px;
  width: 24px;
`

const Divider = styled.div`
  background: #e6e7e8;
  display: none;
  height: 24px;
  width: 1px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: block;
  }
`

class LoginButton extends React.Component<Props, State> {
  state = {
    displayMenu: false,
  }

  handleOutsideClick = () => this.handleMenu()

  handleMenu = () => {
    const { displayMenu } = this.state
    const { isPreview } = this.props

    // We will not show menu in preview
    if (isPreview) return

    !displayMenu
      ? document.addEventListener('click', this.handleOutsideClick, false)
      : document.removeEventListener('click', this.handleOutsideClick, false)

    this.setState(prevState => ({
      displayMenu: !prevState.displayMenu,
    }))
  }

  render() {
    const { displayMenu } = this.state
    const { loginStatus, profile, login, t } = this.props

    switch (loginStatus) {
      case LogInStatusType.AUTHORIZED:
        return (
          <React.Fragment>
            <Divider />

            <ProfileButtonWrapper>
              <ProfileButton onClick={this.handleMenu}>
                <ProfileAvatar src={R.path(['avatar'], profile)} />
              </ProfileButton>

              {displayMenu && <ProfileMenu />}
            </ProfileButtonWrapper>
          </React.Fragment>
        )
      case LogInStatusType.UNAUTHORIZED:
        return (
          <React.Fragment>
            <Divider />

            <HeaderButton
              iconSrc={'/static/images/ico-profile.svg'}
              btnText={t('buttons.sign_in')}
              onClick={() => login(window.location.href)}
            />
          </React.Fragment>
        )
      default:
        return null
    }
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loginStatus: loginStatusSelector(state),
  profile: state.auth.profile,
  isPreview: isPreviewSelector(state),
})

const mapDispatchToProps = {
  login: authActionCreators.login,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation()
)(LoginButton)
