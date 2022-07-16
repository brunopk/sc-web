import React, { ReactElement } from 'react'
import $ from 'jquery'
import styled from 'styled-components'
import { Form, ModalBody, ModalFooter } from '@bootstrap-styled/v4'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import { InputHidden } from '../form'
import { SecondaryButton } from '../buttons'
import StyledBootstrapModal from './StyledBootstrapModal'
import Error from './Error'

type Button = {
  text: string,
  onClick: () => void
}

type ModalProps = {
  children: ReactElement | ReactElement[],
  formId: string,
  primaryBtn: Button,
  secondaryBtn: Button,
  isOpen?: boolean,
  className?: string
  errorMessage?: string,
}

const Cancel = styled(SecondaryButton)`
  flex: 1;
`
const Confirm = styled(BootstrapComponents.Button)`
  flex: 1;
`

export default function Modal({
  children,
  formId,
  primaryBtn,
  secondaryBtn,
  isOpen,
  className,
  errorMessage
} : ModalProps) {
  const cancel = () => {
    secondaryBtn.onClick()
  }
  const confirm = () => {
    const myForm = $(`#${formId}`)
    if (!myForm[0].checkValidity()) {
      // If the form is invalid, submit it. The form won't actually submit;
      // this will just cause the browser to display the native HTML5 error messages.
      myForm.find(':submit').trigger('click')
      return false
    }
    primaryBtn.onClick()
    return true
  }

  return (
    <StyledBootstrapModal primaryBtn={primaryBtn} secondaryBtn={secondaryBtn} isOpen={isOpen} className={className}>
      <Error>
        {errorMessage}
      </Error>
      <ModalBody>
        <Form id={formId}>
          {children}
          <InputHidden type="submit" />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Cancel onClick={cancel}>{secondaryBtn.text}</Cancel>
        <Confirm onClick={confirm}>{primaryBtn.text}</Confirm>
      </ModalFooter>
    </StyledBootstrapModal>
  )
}
