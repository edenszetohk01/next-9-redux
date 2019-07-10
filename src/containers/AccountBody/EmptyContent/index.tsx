import React from 'react'
import styled from 'styled-components'

const StyledEmptyContent = styled.section`
  color: #99adff;
  display: flex;
  flex-direction: column;
  min-height: 268px;
  align-items: center;
  font-size: 14px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 16px;
  }
`

const StyledEmptyIcon = styled.span`
  display: block;
  background: url('/static/images/empty-state.svg') center no-repeat;
  background-size: contain;
  width: 120px;
  height: 120px;
  margin: 40px 0 8px 0;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 160px;
    height: 160px;
  }
`

type Props = {
  description: string
}

const EmptyContent = ({ description }: Props) => (
  <StyledEmptyContent>
    <StyledEmptyIcon />
    <div>{description}</div>
  </StyledEmptyContent>
)

export default EmptyContent
