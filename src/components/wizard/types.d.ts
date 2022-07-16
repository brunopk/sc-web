import * as React from 'react'
import { WizardStep } from '.'

export interface WizardProperties {
  children: React.ReactElement<typeof WizardStep>[],
  id: string,
  className?: string,
  isOpen?: boolean
  toggle?: () => void
}


