import { makeObservable, observable, action } from 'mobx'
import Button from './Button'

export default class Wizard {
  error?: string

  isVisible: boolean

  currentStep: number

  private lastStep: number

  constructor(maxSteps: number) {
    makeObservable<Wizard, 'next'>(this, {
      error: observable,
      isVisible: observable,
      currentStep: observable,
      open: action,
      close: action,
      next: action
    })
    this.isVisible = false
    this.currentStep = 0
    this.lastStep = maxSteps - 1
  }

  open() {
    // TODO: implement initialize form similar to Modal store
    this.isVisible = true
  }

  close() {
    this.isVisible = false
  }

  getPrimaryButton(): Button {
    if (this.currentStep !== this.lastStep) {
      return new Button('NEXT', () => { this.next() })
    }
    // TODO: not finished
    return new Button('FINISH', () => { this.close() })
  }

  getSecondaryButton(): Button {
    if (this.currentStep === 0) {
      // TODO: This should clear wizard form data
      return new Button('CANCEL', () => { this.close() })
    }
    return new Button('BACK', () => { this.prev() })
  }

  private next() {
    // TODO: continue
    // TODO: validate before going forward
    this.currentStep += 1
  }

  private prev() {
    this.currentStep -= 1
  }
}
