/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, FunctionComponent } from 'react'
import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { AvailableOptions, Option } from './AvailableOptions'

type OptionListProps = {
  onSelect: (option: Option) => void
}

const ListGroup = styled(BootstrapComponents.ListGroup)`
  cursor: pointer;
`

const ListGroupItem = styled(BootstrapComponents.ListGroupItem)`
  justify-content: center;
  ${(props) => bp.down('sm', props.theme['$grid-layout'], 'font-size: 0.8rem;')};
`

export type OptionList = FunctionComponent<OptionListProps>

export function buildOptionList(options: AvailableOptions): OptionList {
  return ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(options[Object.keys(options)[0]])
    const onClick = (selectedOption: Option) => () => {
      setSelectedOption(selectedOption)
      onSelect(selectedOption)
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
}
