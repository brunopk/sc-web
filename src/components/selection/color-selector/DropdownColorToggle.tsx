import styled from 'styled-components'
import { DropdownToggle } from '../dropdown'

export default styled(DropdownToggle)`
    border: none!important;
    ${(props) => `background-color: ${props.color}!important;`};
`
