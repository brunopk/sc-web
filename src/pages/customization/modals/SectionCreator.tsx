import React, { useContext } from 'react'
import ColorPicker from 'rc-color-picker'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { Col } from '@bootstrap-styled/v4'
import { ColorIndicator } from '../components'
import { INF, SIZE } from '../../../constants'
import { StoreContext } from '../../../context'
import { Input } from '../../../components/form'
import { Modal } from '../../../components/modal'
import { SecondaryButton } from '../../../components/buttons'

const InfButton = styled(SecondaryButton)`
  width: 90%;
  float: right;
`

const Container = styled(BootstrapComponents.Container)`
  padding: ${SIZE.S60}em 0;
  .row:first-child {
    margin-bottom: ${SIZE.S50}!important;
    align-items: center;
  }
`

const Row = styled(BootstrapComponents.Row)`
  margin-top: ${SIZE.S30}em;
`

export default observer(() => {
  const { store } = useContext(StoreContext)
  const { start, size, gap, repeat, color } = store!.customization.sectionCreator.form

  return (
    <Modal
      formId="section-creator"
      errorMessage={store?.customization.sectionCreator.error}
      isOpen={store?.customization.sectionCreator.isVisible}
      primaryBtn={{ text: 'OK', onClick: () => store!.customization.sectionCreator.createSections() }}
      secondaryBtn={{ text: 'CANCEL', onClick: () => store?.customization.sectionCreator.close() }}>
      <Container>
        <Row>
          <Col>
            <ColorPicker.Panel
              className="m-auto"
              defaultColor={color.value}
              enableAlpha={false}
              onChange={(v) => { color.value = v.color }} />
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <span>Start:</span>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <Input {...start} onBlur={() => store!.customization.sectionCreator.validate()} />
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <span>Size:</span>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <Input {...size} onBlur={() => store!.customization.sectionCreator.validate()} />
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <span>Gap:</span>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <Input {...gap} onBlur={() => store!.customization.sectionCreator.validate()} />
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <span>Repeat:</span>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <Input
              {...repeat}
              onBlur={() => store!.customization.sectionCreator.validate()}
              required={repeat.value !== INF}
              readOnly={repeat.value === INF} />
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <InfButton onClick={() => store!.customization.sectionCreator.toggleRepeatInf()}>∞</InfButton>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <span>Color:</span>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <ColorIndicator color={color.value as string} />
          </Col>
        </Row>
      </Container>
    </Modal>
  )
})
