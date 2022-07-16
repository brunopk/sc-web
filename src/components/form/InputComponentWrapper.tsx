/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { SIZE } from '../../constants'

type InputProps = {
  type: 'text' | 'number',
  className?: string,
  value: string | number,
  name: string,
  error: boolean,
  required?: boolean,
  readOnly?: boolean,
  onBlur?: () => void
}

const Input = styled(BootstrapComponents.Input)`
  line-height: ${SIZE.S62}em!important;
  height: calc(${SIZE.S62 + SIZE.S30 * 2}em + 2px)!important;
  padding: ${SIZE.S30}em ${SIZE.S45}em!important;
  ${({ error }) => error && 'border-color: #dc3545!important;'}
  ${({ error }) => error && 'box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);'}
`

export default ({
  type,
  className,
  value,
  name,
  error = false,
  required = false,
  readOnly = false,
  onBlur = () => null
} : InputProps) => {
  const [valueAux, setValueAux] = useState(value)
  useEffect(() => {
    setValueAux(value)
  }, [value])

  return (
    <Input
      type={type}
      name={name}
      error={error}
      className={className}
      value={valueAux}
      onBlur={() => onBlur()}
      onChange={(event) => setValueAux(event.target.value)}
      required={required}
      readOnly={readOnly} />
  )
}
