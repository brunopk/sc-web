import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { SmallButton } from '../../../components/buttons'
import { COLOR } from '../../../constants'

export default function PowerOff() {
  return (
    <SmallButton onClick={() => null}>
      <FontAwesomeIcon icon={faPowerOff} color={COLOR.MATERIAL_RED_LIGHT} />
    </SmallButton>
  )
}