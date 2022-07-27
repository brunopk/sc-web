import React from 'react'
import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { isMobile } from 'react-device-detect'
import { cmdScrpiStatus } from '../api/commands/scrpi'
import { useScheduledFetch } from '../hooks'
import { setBodyClass, setRootClass } from '../utils/css'
import { DashboardContextProvider } from '../context'
import { SIZE } from '../constants'
import MainMenu from './MainMenu'
import DesktopHeader from './DesktopHeader'
import MobileButtonMenu from './MobileButtonMenu'
import 'rc-color-picker/assets/index.css'
import './Dashboard.css'

const DashboardContent = styled.main`
  width: 100%;
  height: 100%;
  padding: ${SIZE.S60}em;
  ${(props) => bp.up('sm', props.theme['$grid-layout'], `padding-left: ${SIZE.S90 + SIZE.S60}em`)};
  ${(props) => bp.up('sm', props.theme['$grid-layout'], `padding-top: ${SIZE.S70 + SIZE.S30 * 2 + SIZE.S60}em`)};
`

export default function Dashboard({ children, isLandscape }) {
  const deviceStatus = useScheduledFetch(cmdScrpiStatus, 10)

  setRootClass('root-dashboard')
  setBodyClass('body-dashboard')

  return (
    <DashboardContextProvider>
      { !isMobile ? <DesktopHeader /> : <></> }
      <MainMenu />
      <DashboardContent role="main">
        {children}
        { isMobile ? <MobileButtonMenu /> : <></> }
      </DashboardContent>
    </DashboardContextProvider>
  )
}
