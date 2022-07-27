import React, { useState } from 'react'
import { DropdownMenu, Dropdown } from '@bootstrap-styled/v4'
import { Option } from './types/Option'
import { Selector } from './types/Selector'
import ListGroupItem from './list/ListGroupItem'
import ListGroup from './list/ListGroup'
import DropdownItem from './dropdown/DropdownItem'
import DropdownToggle from './dropdown/DropdownToggle'
import Type from './types/Type'

export default (({ type, options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[Object.keys(options)[0]])

  if (type === Type.List) {
    const onClick = (option: Option) => () => {
      setSelectedOption(option)
      onSelect(option)
    }
    return (
      <ListGroup>
        {Object.keys(options).map((key, index) => (
          <ListGroupItem
            key={index}
            active={selectedOption.name === options[key].name}
            onClick={onClick(options[key])}>
            {options[key].text}
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }

  const [state, setState] = useState({ isOpen: false, selectedOption: options[Object.keys(options)[0]] })
  // eslint-disable-next-line no-shadow
  const onClick = (option: Option) => () => {
    setState({ isOpen: false, selectedOption: option })
    onSelect(selectedOption)
  }
  return (
    <Dropdown
      isOpen={state.isOpen}
      toggle={() => setState({ isOpen: !state.isOpen, selectedOption: state.selectedOption })}>
      <DropdownToggle>{state.selectedOption.text || <br />}</DropdownToggle>
      <DropdownMenu>
        {Object.keys(options).map((key) => (
          <DropdownItem
            onClick={onClick(options[key])}>
            {options[key].text || <br />}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}) as Selector
