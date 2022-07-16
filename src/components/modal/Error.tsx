import React from 'react'
import styled from 'styled-components'
import * as BootstrapComponents from '@bootstrap-styled/v4'

const StyledBootstrapAlert = styled(BootstrapComponents.Alert)`
  font-size: 0.9em!important;
  ${({ message }) => (message && 'visibility: visible;') || 'display: none;'}
  span {
    display: inline-block;
  }
`

export default function Error({ children }) {
  return (
    <StyledBootstrapAlert message={children} color="danger">
      <span>{children}</span>
    </StyledBootstrapAlert>
  )
}
