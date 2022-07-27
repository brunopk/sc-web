import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import $ from 'jquery'
import { isMobile } from 'react-device-detect'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { Link } from 'react-router-dom'
import { DashboardContext } from '../context'
import { ROUTES, SIZE, COLOR } from '../constants'

// TODO: set all modals closed after navigating to a link

// This eslint rule disabling comment is as a workaround for syntax highlighting issue on VSCode
// eslint-disable-next-line arrow-body-style
const Ul = styled.ul.attrs(() => { return { className: 'nav flex-column' } })`
  width: ${SIZE.S90}em;
  ${(props) => bp.up('sm', props.theme['$grid-layout'], `padding-top: ${SIZE.S70 + SIZE.S30 * 2}em;`)}
`

// eslint-disable-next-line arrow-body-style
const Nav = styled.nav.attrs(() => { return { className: 'sidebar' } })`
  background: ${COLOR.GRAY20};
  ${(props) => bp.down('sm', props.theme['$grid-layout'], 'display: none')}
`

const NavItem = styled(BootstrapComponents.NavItem)`
  :hover {
    background: ${COLOR.GRAY30};
    box-shadow: inset -1px 0 0 rgba(0, 123, 255, 0.1)
  }
`

const MenuItemStyle = css`
  padding: ${SIZE.S50}em 0 ${SIZE.S50}em ${SIZE.S65}em;
  font-weight: 500;
  display: block;
  :hover {
    text-decoration: none;
  }
`
const CustomLink = styled(Link)`
  ${MenuItemStyle}
`

const CustomAnchor = styled.a`
  ${MenuItemStyle}
`

function MainMenu() {
  const { menu } = useContext(DashboardContext)

  // To hide menu on mobile
  const onClickLink = () => {
    // Remove panel data on main context
    if (isMobile) {
      $('.sidebar').animate({ width: 'toggle' })
    }
  }

  return (
    <Nav>
      <Ul>
        {menu.items.map((item, index) => (
          <NavItem key={index}>
            { item.isPath ? (
              <CustomLink to={item.path} onClick={() => onClickLink()}>
                <FontAwesomeIcon icon={item.icon} size="lg" className="mr-3" />
                {item.label}
              </CustomLink>
            ) : (
              <CustomAnchor onClick={item.onClick}>
                <FontAwesomeIcon icon={item.icon} size="lg" className="mr-3" />
                {item.label}
              </CustomAnchor>
            )}
          </NavItem>
        ))}
        {menu.isSubMenu ? (
          <NavItem>
            <CustomLink to="/" onClick={() => onClickLink()}>
              <FontAwesomeIcon icon={faArrowLeft} size="lg" className="mr-3" />
              Back
            </CustomLink>
          </NavItem>
        ) : (
          <NavItem>
            <CustomAnchor href={ROUTES.LOGOUT}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-3" />
              Exit
            </CustomAnchor>
          </NavItem>
        )}
      </Ul>
    </Nav>
  )
}

export default MainMenu
