import React from 'react'
import styled from 'styled-components'
import { Row } from '@bootstrap-styled/v4'
import { Card, CardBody, CardHeader } from '../../../components/card'
import { Col } from '../../../components/utils'
import * as FormComponents from '../../../components/form'
import { SIZE } from '../../../constants'
import Edit from './Edit'
import PowerOff from './PowerOff'

const Title = styled.span`
  padding-left: ${SIZE.S60}rem;
`

const Text = styled(FormComponents.Text)`
  width: 8rem;
`

export default function Device() {
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col xs={5} sm={3} md={3} lg={3} xl={3} center>
            <Title>Raspberry Pi 3</Title>
          </Col>
          <Col xs={7} sm={9} md={9} lg={9} xl={9} end>
            <Edit />
            <PowerOff />
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Text>Hostname/IP:</Text>
          <Text>localhost</Text>
        </Row>
        <Row>
          <Text>Port:</Text>
          <Text>8000</Text>
        </Row>
        <Row>
          <Text>Status:</Text>
          <Text>Connected</Text>
        </Row>
      </CardBody>
    </Card>
  )
}
