import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import $ from 'jquery'
import { Form, ModalBody, ModalFooter, Button } from '@bootstrap-styled/v4'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { InputHidden } from '../form'
import { SecondaryButton } from '../buttons'
import { Context } from './Context'

interface WizardStepProps {
  children: React.ReactNode,
  validationFunction: () => boolean,
  confirmFunction?: () => void,
  autoConfirmFunction ?: () => Promise<void>,
  showBackButton?: boolean,
  confirmButtonText?: string
}

const Confirm = styled(Button)`
  ${(props) => bp.down('sm', props.theme['$grid-layout'], 'flex-grow:1!important;')};
`

const Back = SecondaryButton

const Cancel = SecondaryButton

const Next = Button

function WizardStep({
  children,
  validationFunction,
  confirmFunction,
  autoConfirmFunction,
  showBackButton = true,
  confirmButtonText = 'CONFIRM'
} : WizardStepProps) {
  const { id, step, lastStep, setStep } = useContext(Context)
  const context = useContext(Context)
  const formId = `form-${id}-step-${step}`
  const validate = () => {
    const myForm = $(`#${formId}`)
    if (!myForm[0].checkValidity()) {
      // If the form is invalid, submit it. The form won't actually submit;
      // this will just cause the browser to display the native HTML5 error messages.
      myForm.find(':submit').trigger('click')
      return false
    }
    return validationFunction()
  }

  // eslint-disable-next-line no-shadow
  const closeWizard = (lastStep = false) => {
    if (confirmFunction && lastStep) confirmFunction()
    context.closeWizard!()
    setTimeout(() => setStep!(0), 1000)
  }

  useEffect(() => {
    const execute = async () => {
      if (typeof autoConfirmFunction !== 'undefined') {
        await autoConfirmFunction()
        setStep!(step! + 1)
      }
    }
    execute()
  })

  // TODO: autoconfirm no sirve, sacarlo
  return (
    <>
      <ModalBody>
        <Form id={formId} className="justify-content-center align-middle d-flex">
          {children}
          <InputHidden type="submit" />
        </Form>
      </ModalBody>
      {typeof autoConfirmFunction === 'undefined' ? (
        <ModalFooter>
          {step === 0 ? (
            <Cancel onClick={() => closeWizard()} color="secondary">CANCEL</Cancel>
          ) : (<></>)}
          {step! > 0 && showBackButton ? (
            <Back onClick={() => setStep!(step! - 1)}>BACK</Back>
          ) : (<></>)}
          {step !== lastStep ? (
            <Next onClick={() => { if (validate()) { setStep!(step! + 1) } }}>NEXT</Next>
          ) : (<></>)}
          {step === lastStep ? (
            <Confirm onClick={() => { if (validate()) { closeWizard(true) } }}>{confirmButtonText}</Confirm>
          ) : (<></>)}
        </ModalFooter>
      ) : (<></>) }
    </>
  )
}

export default WizardStep
