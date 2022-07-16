import styled from 'styled-components'
import { Col } from '@bootstrap-styled/v4'

// Center vertical middle and/or horizontal
export default styled(Col)`
  ${(props) => `${props.center ? 'margin: auto!important;' : ''}`};
  ${(props) => `${props.end ? 'display: flex!important;justify-content: end;' : ''}`};
`
