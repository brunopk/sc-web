import React, { useContext } from 'react'
import styled from 'styled-components'
import Loader from '../../components/loader'
import { Input, Row } from '@bootstrap-styled/v4'
import { Wizard, WizardStep } from '../../components/wizard'
import { Col } from '../../components/utils'
import { DashboardContext } from '../../context'
import { MODAL_ID } from '../../constants'
import * as BootstrapComponents from '@bootstrap-styled/v4'

// TODO: validationFunction , see if it's really necessary and if it comes from mobx store
// TODO: confirm function
// TODO: improve design for tablets and phones on portrait position

const CustomizedWizard = styled(Wizard)`
  .modal-dialog {
    flex-grow: 0.45;
  }
`

const Container = styled(BootstrapComponents.Container)`
  padding: 0!important;
  .row:nth-child(2), .row:nth-child(3) {
    margin-top: 1rem;
  }
`

export default function NewDeviceWizard() {
  const { isModalOpened, toggleModal } = useContext(DashboardContext)
  // TODO: just for testing implement this
  const autoConfirmFunction = () => new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 3000)
  })

  return (
    <CustomizedWizard
      id={MODAL_ID.NEW_DEVICE_MODAL}
      isOpen={isModalOpened(MODAL_ID.NEW_DEVICE_MODAL)}
      toggle={() => toggleModal(MODAL_ID.NEW_DEVICE_MODAL)}>
      <WizardStep validationFunction={() => true}>
        <Container>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} center>
              <span>Name:</span>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Input
                id="sectionDefinitionStart"
                type=""
                value="Raspberry Pi"
                onBlur={() => null}
                required />
            </Col>
          </Row>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} center>
              <span>IP/Hostname:</span>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Input
                id="sectionDefinitionSize"
                type="text"
                value="127.0.0.1"
                onBlur={() => null}
                required />
            </Col>
          </Row>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} center>
              <span>Port:</span>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Input
                id="sectionDefinitionGap"
                type="number"
                value={8000}
                onBlur={() => null}
                required />
            </Col>
          </Row>
        </Container>
      </WizardStep>
      <WizardStep validationFunction={() => true} autoConfirmFunction={autoConfirmFunction}><Loader /></WizardStep>
      <WizardStep
        confirmFunction={() => true}
        showBackButton={false}
        validationFunction={() => true}
        confirmButtonText="FINISH">
        <div className="alert-danger">Device successfully added.</div>
      </WizardStep>
    </CustomizedWizard>
  )
}
