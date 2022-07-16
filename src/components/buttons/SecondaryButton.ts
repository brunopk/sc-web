import styled from 'styled-components'
import { Button } from '@bootstrap-styled/v4'
import { COLOR } from '../../constants'

export default styled(Button)`
  width:auto;
  color: white!important;
  ${() => `background: ${COLOR.MATERIAL_GRAY}!important;`};
  ${() => `border-color: ${COLOR.MATERIAL_GRAY}!important;`};
  :hover {
    ${() => `background: ${COLOR.MATERIAL_GRAY_DARK}!important;`};
    ${() => `border-color: ${COLOR.MATERIAL_GRAY_DARK}!important;`};
  }
`
