import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { SIZE } from '../../../constants'

export default styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    ${() => `padding: ${SIZE.S30}rem 0rem!important`};
    ${(props) => bp.down('sm', props.theme['$grid-layout'], 'font-size: 0.8rem;')};
`
