import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { SmallButton } from '../../../components/buttons'
import { COLOR } from '../../../constants'

export default function Edit() {
  return (
    <SmallButton onClick={() => null}>
      <FontAwesomeIcon icon={faEdit} color={COLOR.MATERIAL_GREEN} />
    </SmallButton>
  )
}
