import React, { useContext } from 'react'
import { faPowerOff, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavItem } from '@bootstrap-styled/v4'
import styled from 'styled-components'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { COLOR, SIZE } from '../constants'
import { CircleButton } from '../components/buttons'
import { DashboardContext, StoreContext } from '../context'

const PowerOff = styled(CircleButton)`
  background: ${COLOR.MATERIAL_RED_LIGHT};
  border-color: ${COLOR.MATERIAL_BLUE};
  :hover { 
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20);
    border-color: ${COLOR.MATERIAL_RED_LIGHT};
  }
`

const StatusIcon = styled(CircleButton)`
  background: ${COLOR.MATERIAL_BLUE_LIGHT};
  border-color: ${COLOR.MATERIAL_BLUE};
  :hover { 
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20);
    border-color: ${COLOR.MATERIAL_BLUE_LIGHT};
  }
`

// This eslint rule disabling comment is as a workaround for syntax highlighting issue on VSCode
// eslint-disable-next-line arrow-body-style
const Ul = styled.ul.attrs(() => { return { className: 'navbar-nav' } })`
  flex-direction: row!important;
  justify-content: flex-end!important;
`

const Navbar = styled(BootstrapComponents.Navbar)`
  position: fixed!important;
  background-color: ${COLOR.MATERIAL_BLUE};
  width: 100%;
`

const NavLink = styled(BootstrapComponents.NavLink)`
  padding: ${SIZE.S30}em ${SIZE.S60}em !important;
`

const Row = styled(BootstrapComponents.Row)`
  width: 100%;
  margin: 0!important;
`

const Col = styled(BootstrapComponents.Col)`
  padding: 0!important;
`

// TODO: clear session storage content before clicking menu option

export default function DesktopHeader() {
  const { store } = useContext(StoreContext)
  const { buttonMenu/* , fetching */ } = useContext(DashboardContext)

  return (
    <Navbar className="navbar-expand-lg navbar-light sticky-top flex-md-nowrap p-0 shadow">
      <Row>
        <Col>
          <Ul>
            {
              buttonMenu.map(({ icon, onClick }, index) => (
                <NavItem key={index}>
                  <NavLink>
                    <CircleButton
                      onClick={typeof onClick !== 'undefined' ? () => onClick() : () => null}>
                      <FontAwesomeIcon icon={icon} color="white" />
                    </CircleButton>
                  </NavLink>
                </NavItem>
              ))
            }
            <NavItem onClick={() => { console.log('Not implemented.') }}>
              <NavLink>
                <StatusIcon>
                  <FontAwesomeIcon icon={faWifi} color="white" />
                </StatusIcon>
              </NavLink>
            </NavItem>
            <NavItem onClick={() => store?.toggleDeviceButton()}>
              <NavLink>
                <PowerOff>
                  <FontAwesomeIcon icon={faPowerOff} color="white" />
                </PowerOff>
              </NavLink>
            </NavItem>
          </Ul>
        </Col>
      </Row>
    </Navbar>
  )
}
