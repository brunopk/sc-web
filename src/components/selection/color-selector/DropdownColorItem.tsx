import styled from 'styled-components'
import { DropdownItem } from '../dropdown'

export default styled(DropdownItem)`
    ${(props) => `background-color: ${props.color}!important`}
`
