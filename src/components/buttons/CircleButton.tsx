import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { SIZE, COLOR } from '../../constants'

type CircleButtonProps = {
  children: ReactElement
  className?: string
  onClick?: () => void
}

const Button = styled.button`
  color: white;
  padding: 0;
  border-style: solid;
  background: ${COLOR.MATERIAL_GREEN};
  border-color: ${COLOR.MATERIAL_BLUE};
  border-radius: 100%;
  height: ${SIZE.S70}rem;
  width: ${SIZE.S70}rem;
  ${(props) => bp.down(
    'sm',
    props.theme['$grid-layout'],
    `box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20);
    border-color: ${COLOR.MATERIAL_GREEN};`
  )};
  :hover { 
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20);
    border-color: ${COLOR.MATERIAL_GREEN};
  }
`

export default function CircleButton({ children, className, onClick }: CircleButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  )
}
