import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { DropdownToggle } from '@bootstrap-styled/v4'
import { SIZE } from '../../../constants'

export default styled(DropdownToggle)`
    display: flex;
    ${() => `padding: ${SIZE.S30}rem 0rem!important`};
    ${(props) => bp.down('sm', props.theme['$grid-layout'], 'font-size: 0.8rem;')};
`
