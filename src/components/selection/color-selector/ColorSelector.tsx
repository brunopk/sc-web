import React, { useState } from 'react'
import { DropdownMenu, Dropdown } from '@bootstrap-styled/v4'
import { ColorSelector, Color } from '../types'
import DropdownColorItem from './DropdownColorItem'
import DropdownColorToggle from './DropdownColorToggle'

export default (({ options, onSelect }) => {
  const [state, setState] = useState({ isOpen: false, selectedColor: options[Object.keys(options)[0]] })
  const onClick = (color: Color) => () => {
    setState({ isOpen: false, selectedColor: color })
    onSelect(color)
  }
  return (
    <Dropdown
      isOpen={state.isOpen}
      toggle={() => setState({ isOpen: !state.isOpen, selectedColor: state.selectedColor })}>
      <DropdownColorToggle color={state.selectedColor.hex}><br /></DropdownColorToggle>
      <DropdownMenu>
        {Object.keys(options).map((key) => (
          <DropdownColorItem color={options[key].hex} onClick={onClick(options[key])}><br /></DropdownColorItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}) as ColorSelector
