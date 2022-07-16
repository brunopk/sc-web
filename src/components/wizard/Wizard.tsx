import React, { useState } from 'react'
import { StyledBootstrapModal } from '../modal'
import { ContextProvider } from './Context'
import { WizardProperties } from './types'

/**
 * To set height, put the same flex-grow value for .modal-content and .modal-dialog
 */
function Wizard({ id, className, children, isOpen, toggle }: WizardProperties) {
  const [step, setStep] = useState(0)
  const lastStep = children.length - 1

  return (
    <ContextProvider step={step} setStep={setStep} lastStep={lastStep} id={id} closeWizard={toggle}>
      <StyledBootstrapModal isOpen={isOpen} toggle={() => { if (toggle) toggle() }} className={className}>
        {children[step]}
      </StyledBootstrapModal>
    </ContextProvider>
  )
}

export default Wizard
