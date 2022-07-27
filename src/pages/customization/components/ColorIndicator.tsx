import React from 'react'
import styled from 'styled-components'
import { SIZE } from '../../../constants'
import { Text } from '../../../components/form'

type ColorIndicatorProps = {
  color: string
  className?: string
}

const ColorIndicator = styled(Text)<{ color: string }>`
  flex: 1;
  display: block;
  padding: ${SIZE.S30}em ${SIZE.S45}em!important;
  border-radius: ${SIZE.S10}em;
  border-color: ${(props) => props.color};
  background-color: ${(props) => props.color};
`

export default ({ color, className }: ColorIndicatorProps) => (
  <ColorIndicator color={color} className={className}>
    <br />
  </ColorIndicator>
)
