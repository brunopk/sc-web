import styled from 'styled-components'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { SIZE } from '../../constants'

export default styled(BootstrapComponents.Modal)`
  .alert {
    margin: 0!important
  }
  .modal {
    display: flex!important;
    flex-direction: column;
  }
  .modal-dialog {
    width:100%;
    background: none!important;
    border: none!important;
    ${(props) => bp.up('sm', props.theme['$grid-layout'], 'margin: auto!important')};
    ${(props) => bp.down('sm', props.theme['$grid-layout'], 'margin-top: 0!important; height: 100%')};
  }
  .modal-body {
    padding: 0!important;
  }
  .modal-footer {
    padding: 0!important;
    border: none!important;
  }
  .modal-footer > *:first-child {
    margin-left: 0!important;
  }
  .modal-footer > *:last-child {
    margin-right: 0!important;
  }
  .modal-content {
    height: 100%;
    overflow: auto;
    ${(props) => bp.up('sm', props.theme['$grid-layout'], `padding: ${SIZE.S67}em`)};
    ${(props) => bp.down('sm', props.theme['$grid-layout'], `padding: ${SIZE.S65}em`)};
  }
`
