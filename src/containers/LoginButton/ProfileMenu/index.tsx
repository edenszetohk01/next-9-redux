import React from 'react'
import { isMobile } from 'react-device-detect'
import { WithTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'redux'
import ActionButton from 'src/components/global/ActionButton'
import Tooltip from 'src/components/Tooltip'
import urls from 'src/constants/urls'
import { authActionCreators } from 'src/redux/auth'
import styled from 'styled-components'

const TooltipButton = styled(ActionButton)`
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.78);
  display: block;
  font-size: 16px;
  letter-spacing: 0.4px;
  line-height: 1.5;
  padding: 16px 24px;
  text-align: left;
  text-decoration: none;
  width: 288px;
`

const TooltipButtonSet = styled.div<{ isMobile: boolean }>`
  display: none;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: ${({ isMobile }) => (isMobile ? 'none' : 'block')};
  }
`

const LogoutButton = styled(TooltipButton)`
  border-top: 1px solid #e6e7e8;
`

type Props = WithTranslation & {
  logout: () => void
}

const ProfileMenu = ({ logout, t }: Props) => (
  <Tooltip>
    <TooltipButtonSet isMobile={isMobile}>
      <TooltipButton as='a' href={urls.createContentUrl} target='_blank'>
        {t('buttons.create_story')}
      </TooltipButton>
      <TooltipButton as='a' href={urls.contentManagementUrl} target='_blank'>
        {t('buttons.manage_stories')}
      </TooltipButton>
      <TooltipButton as='a' href={urls.puaPmpAccountSettings} target='_blank'>
        {t('buttons.pmp_pua_account_settings')}
      </TooltipButton>
    </TooltipButtonSet>
    <TooltipButton as='a' href={urls.pmpAccountSettings} target='_blank'>
      {t('buttons.pmp_account_settings')}
    </TooltipButton>
    <LogoutButton onClick={logout}>{t('buttons.sign_out')}</LogoutButton>
  </Tooltip>
)

const mapDispatchToProps = {
  logout: authActionCreators.logout,
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withTranslation()
)(ProfileMenu)
