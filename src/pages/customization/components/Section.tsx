import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Row } from '@bootstrap-styled/v4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular, faEdit } from '@fortawesome/free-regular-svg-icons'
import { Card, CardBody, CardHeader } from '../../../components/card'
import { SmallButton } from '../../../components/buttons'
import { Text } from '../../../components/form'
import { COLOR } from '../../../constants'
import ColorIndicator from './ColorIndicator'

type SectionProps = {
  start: number
  end: number
  color: string
  isOn: boolean
}

const SmallColorIndicator = styled(SmallButton)<{ color: string }>`
  color: ${(props) => props.color}!important;
  :hover {
    color: ${(props) => props.color}!important;;
  }
`

const Label = styled(Text)`
  width: 7em;
`

export default observer(({ start, end, color, isOn }: SectionProps) => (
  <Card expanded expandible>
    <CardHeader>
      <Row>
        <SmallButton onClick={() => null}>
          <FontAwesomeIcon icon={faPowerOff} color={COLOR.MATERIAL_RED_LIGHT} />
        </SmallButton>
        <SmallButton onClick={() => null}>
          <FontAwesomeIcon icon={faEdit} color={COLOR.MATERIAL_GREEN} />
        </SmallButton>
        <SmallColorIndicator onClick={() => null} color={color}>
          <FontAwesomeIcon icon={isOn ? faCircleSolid : faCircleRegular} />
        </SmallColorIndicator>
      </Row>
    </CardHeader>
    <CardBody>
      <Row>
        <Label>Start:</Label>
        <Text>{start}</Text>
      </Row>
      <Row>
        <Label>End:</Label>
        <Text>{end}</Text>
      </Row>
      <Row>
        <Label>Color:</Label>
        <ColorIndicator color={color} />
      </Row>
    </CardBody>
  </Card>
)) as FunctionComponent<SectionProps>
