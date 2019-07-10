import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import EmptyContent from 'src/containers/AccountBody/EmptyContent'
import styled from 'styled-components'

const AboutWrapper = styled.div`
  padding-bottom: 24px;
  padding-top: 24px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding-left: 33px;
    padding-right: 33px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin: 0 auto;
    width: 730px;
  }
`

const AboutTitle = styled.div`
  color: #1f253d;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-bottom: 16px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 20px;
  }
`

const AboutContent = styled.div`
  color: rgba(0, 0, 0, 0.78);
  font-size: 14px;
  letter-spacing: 0.4px;
  line-height: 1.43;
  white-space: pre-wrap;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 16px;
    line-height: 1.5;
  }
`

type Props = WithTranslation & {
  introduction: string | null
}

const AccountAbout = ({ t, introduction }: Props) =>
  !introduction ? (
    <EmptyContent description={t('containers.account_body.empty.about')} />
  ) : (
    <AboutWrapper>
      <AboutTitle>{t('containers.account_body.about')}</AboutTitle>
      <AboutContent>{introduction}</AboutContent>
    </AboutWrapper>
  )

export default withTranslation()(AccountAbout)
