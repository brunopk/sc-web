import styled from 'styled-components'
import { Button } from '@bootstrap-styled/v4'
import { bp } from '@bootstrap-styled/css-mixins/lib'

export default styled(Button)`
  ${(props) => bp.down('sm', props.theme['$grid-layout'], 'font-size: 0.8rem!important;')};
`
