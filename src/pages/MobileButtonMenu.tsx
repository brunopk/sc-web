import React, { useContext } from 'react'
import { faBars, faPowerOff, faWifi } from '@fortawesome/free-solid-svg-icons'
import styled, { css } from 'styled-components'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DashboardContext } from '../context'
import { COLOR, SIZE } from '../constants'
import * as Buttons from '../components/buttons'

const Container = css`
  z-index: 1;
  position: fixed;
  right: ${SIZE.S30}em;
  display: flex;
  flex-flow: column;
`

const TopContainer = styled.div`
  ${Container}
  top: 0; 
`

const BottomContainer = styled.div`
  ${Container}
  bottom: 0;
`

const TopButton = styled(Buttons.CircleButton)`
  margin-top: ${SIZE.S50}em;
`

const PowerButton = styled(Buttons.CircleButton)`
  margin-bottom: ${SIZE.S50}em;
  background: ${COLOR.MATERIAL_RED_LIGHT};
  border-color: ${COLOR.MATERIAL_RED_LIGHT};
`

const BottomButton = styled(Buttons.CircleButton)`
  margin-bottom: ${SIZE.S50}em;
`

export default function MobileButtonMenu() {
  const { buttonMenu } = useContext(DashboardContext)

  return (
    <>
      <TopContainer>
        <TopButton onClick={() => $('.sidebar').animate({ width: 'toggle' })}>
          <FontAwesomeIcon icon={faBars} color="white" />
        </TopButton>
        <TopButton onClick={() => {}}>
          <FontAwesomeIcon icon={faWifi} size="sm" color="white" />
        </TopButton>
      </TopContainer>
      <BottomContainer>
        { buttonMenu.map(({ icon, onClick }, index) => (
          <BottomButton key={index} onClick={typeof onClick !== 'undefined' ? () => onClick() : undefined}>
            <FontAwesomeIcon icon={icon} />
          </BottomButton>
        )) }
        <PowerButton onClick={() => {}}>
          <FontAwesomeIcon icon={faPowerOff} size="sm" color="white" />
        </PowerButton>
      </BottomContainer>
    </>
  )
}
