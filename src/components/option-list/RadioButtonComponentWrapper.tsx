/* eslint-disable no-shadow */
import React, { useState } from 'react'
import styled from 'styled-components'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { SIZE } from '../../constants'

type RadioProps = {
  name: string,
  value: string,
  myName: string,
  initAsChecked?: boolean,
  onCheck: () => void
}

const Input = styled(BootstrapComponents.Input)`
  line-height: ${SIZE.S62}em!important;
  height: calc(${SIZE.S62 + SIZE.S30 * 2}em + 2px)!important;
  padding: ${SIZE.S30}em ${SIZE.S45}em!important;
  ${({ error }) => error && 'border-color: #dc3545!important;'}
  ${({ error }) => error && 'box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);'}
`

export default ({ name, myName, value, initAsChecked, onCheck } : RadioProps) => {
  const [checked, setChecked] = useState(typeof initAsChecked === 'undefined' ? false : initAsChecked)
  const onChange = (newValue: string) => {
    if (newValue === myName) {
      setChecked(true)
      onCheck()
    } else {
      setChecked(false)
    }
    alert(`${name} is ${newValue}`)
  }

  return (
    <Input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
