import React, { createContext } from 'react'

/* eslint-disable no-unused-vars */
type ContextProps = {
  id?: string
  step?: number
  lastStep?: number
  setStep?: (number) => void
  closeWizard?: () => void
}

export const Context = createContext<ContextProps>({})

export function ContextProvider({ children, id, step, lastStep, setStep, closeWizard }) {
  return (
    <Context.Provider value={{ id, step, setStep, lastStep, closeWizard }}>
      {children}
    </Context.Provider>
  )
}
