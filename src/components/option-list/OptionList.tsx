import React, { useState, FunctionComponent } from 'react'
import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { ListGroupItem, ListGroup } from '@bootstrap-styled/v4'
import { SIZE, COLOR } from '../../constants'
import { AvailableOptions, Option } from './AvailableOptions'

type OptionListProps = {
  // eslint-disable-next-line no-unused-vars
  onSelect: (option: Option) => void
}

const StyledListGroup = styled(ListGroup)`
  cursor: pointer;
  .active {
    background-color: white!important;
    ${() => `border-color: ${COLOR.MATERIAL_BLUE}!important`};
    ${() => `color: ${COLOR.MATERIAL_BLUE}!important`};
  }
`

const StyledListGroupItem = styled(ListGroupItem)`
  justify-content: center;
  ${() => `padding: ${SIZE.S30}rem 0rem!important`};
  ${(props) => bp.down('sm', props.theme['$grid-layout'], 'font-size: 0.8rem;')};
`

export type OptionList = FunctionComponent<OptionListProps>

export function buildOptionList(options: AvailableOptions): OptionList {
  return ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(options[Object.keys(options)[0]])
    // eslint-disable-next-line no-shadow
    const onClick = (selectedOption: Option) => () => {
      setSelectedOption(selectedOption)
      onSelect(selectedOption)
    }

    return (
      <StyledListGroup>
        {Object.keys(options).map((key, index) => (
          <StyledListGroupItem
            key={index}
            active={selectedOption.name === options[key].name}
            onClick={onClick(options[key])}>
            {options[key].text}
          </StyledListGroupItem>
        ))}
      </StyledListGroup>
    )
  }
}
