import styled from 'styled-components'
import { Button } from '@bootstrap-styled/v4'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { COLOR } from '../../constants'

export default styled(Button)`
  width:auto;
  color: white!important;
  ${() => `background: ${COLOR.MATERIAL_GRAY}!important;`};
  ${() => `border-color: ${COLOR.MATERIAL_GRAY}!important;`};
  ${(props) => bp.down('sm', props.theme['$grid-layout'], 'font-size: 0.8rem!important;')};
  :hover {
    ${() => `background: ${COLOR.MATERIAL_GRAY_DARK}!important;`};
    ${() => `border-color: ${COLOR.MATERIAL_GRAY_DARK}!important;`};
  }
`
