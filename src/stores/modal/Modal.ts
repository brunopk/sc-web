import { makeObservable, action, observable } from 'mobx'
import { collectFormValues, validate } from 'validate.js'
import { forOwn } from 'lodash'
import { Form } from './Form'

// Based on https://medium.com/@KozhukharenkoN/react-form-validation-with-mobx-8ce00233ae27

export default class Modal {
  formId: string

  form: Form

  isVisible: boolean

  error?: string

  constructor() {
    makeObservable(this, {
      isVisible: observable,
      error: observable,
      form: observable,
      open: action,
      close: action,
      validate: action
    })
    this.isVisible = false
    this.initializeForm()
  }

  open() {
    this.initializeForm()
    this.isVisible = true
  }

  close() {
    this.isVisible = false
  }

  validate(): boolean {
    let result = true
    const constraints = {}
    const form = document.querySelector(`form#${this.formId}`)
    const data = collectFormValues(form)
    forOwn(data, (value, key) => {
      this.form[key].value = value
      this.form[key].error = false
      constraints[key] = this.form[key].constraints
    })
    forOwn(validate(data, constraints), (error, key) => {
      this.form[key].error = true
      this.error = error
      result = false
      return result
    })
    return result
  }

  // eslint-disable-next-line class-methods-use-this
  protected initializeForm() {
    throw new Error('Not implemented')
  }
}
