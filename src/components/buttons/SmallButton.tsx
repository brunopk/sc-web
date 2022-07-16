import React, { ReactElement } from 'react'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import styled from 'styled-components'
import { COLOR, SIZE } from '../../constants'

type SmallButtonProps = {
  children?: ReactElement
  className?: string
  onClick: () => void
}

const Button = styled(BootstrapComponents.Button)`
  background-color: transparent!important;
  border: transparent!important;
  padding: ${SIZE.S30}rem ${SIZE.S60}rem;
  :hover {
    background: ${COLOR.GRAY30}!important;
  }
  :focus {
    border: none!important;
    box-shadow: none!important;
  }
`

export default function SmallButton({ children, className, onClick }: SmallButtonProps) {
  return (<Button className={className} onClick={onClick}>{children}</Button>)
}
