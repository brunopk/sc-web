import styled from 'styled-components'
import { ListGroup } from '@bootstrap-styled/v4'
import { COLOR } from '../../../constants'

export default styled(ListGroup)`
  cursor: pointer;
  .active {
    background-color: white!important;
    ${() => `border-color: ${COLOR.MATERIAL_BLUE}!important`};
    ${() => `color: ${COLOR.MATERIAL_BLUE}!important`};
  }
`
