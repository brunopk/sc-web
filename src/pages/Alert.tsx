import React from 'react'
import styled from 'styled-components'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { SIZE } from '../constants'

const AlertContainer = styled.div`
  position: fixed;
  z-index: 2020;
  width: 100%;
  ${(props) => bp.down('sm', props.theme['$grid-layout'], `padding: ${SIZE.S60}em;`)};
`

const StyledBootstrapAlert = styled(BootstrapComponents.Alert)`
  position: relative;
  height: ${SIZE.S70 + SIZE.S30 * 2}em;
  box-shadow: 0 0.5em 1em rgb(0 0 0 / 15%);
  ${(props) => bp.down('sm', props.theme['$grid-layout'], 'width: 100%;')};
  ${(props) => bp.up('sm', props.theme['$grid-layout'], 'width: 50%;')};
  ${(props) => bp.up('sm', props.theme['$grid-layout'], `margin: ${SIZE.S60}em auto;`)};
`

// TODO: use bootstrap styled (delete components/bootstrap)
// TODO: try removing bootstrap dependency (use only @bootstrap-styled/v4 )

export default function Alert() {
  return (
    <AlertContainer>
      <StyledBootstrapAlert color="success">OK</StyledBootstrapAlert>
    </AlertContainer>
  )
}
