import { makeObservable, action } from 'mobx'
import { INF } from '../../../constants'
import Modal from '../../../stores/modal'
import Customization from './Customization'
import Section from './Section'

export default class SectionCreator extends Modal {
  parentStore: Customization

  numberOfLed: number

  constructor(parentStore: Customization) {
    super()
    makeObservable(this, {
      createSections: action,
      toggleRepeatInf: action
    })
    this.parentStore = parentStore
    this.formId = 'section-creator'
  }

  // TODO: use reaction to set repeat when repeatInf change and to disable validations

  createSections() {
    // validating parameters ...
    if (!super.validate()) {
      return
    }

    // TODO: validate overlapping using sortSections function

    // adding sections ...
    const repeat = this.form.repeat.value
    const start: number = this.form.start.value as number
    const size: number = this.form.size.value as number
    const gap: number = this.form.gap.value as number
    const color: string = this.form.color.value as string

    if (repeat === INF) {
      for (let i = start; i < this.numberOfLed; i += size + gap) {
        this.parentStore.sections.push(new Section(i, i + size - 1, color))
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        const startAux = start + i * (size + gap)
        this.parentStore.sections.push(new Section(startAux, startAux + size - 1, color))
      }
    }
  }

  toggleRepeatInf() {
    if (this.form.repeat.value !== INF) {
      this.form.repeat.value = INF
      this.form.repeat.type = 'text'
      this.form.repeat.constraints = {}
    } else {
      this.form.repeat.value = 1
      this.form.repeat.type = 'number'
      this.form.repeat.constraints = {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: -1
        }
      }
    }
  }

  protected initializeForm(): void {
    this.error = undefined
    this.form = {
      start: {
        value: 0,
        name: 'start',
        type: 'number',
        required: true,
        error: false,
        constraints: {
          numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0
          }
        }
      },
      size: {
        value: 1,
        name: 'size',
        type: 'number',
        required: true,
        error: false,
        constraints: {
          numericality: {
            onlyInteger: true,
            greaterThan: 0
          }
        }
      },
      gap: {
        value: 0,
        name: 'gap',
        type: 'number',
        required: true,
        error: false,
        constraints: {
          numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0
          }
        }
      },
      repeat: {
        value: 1,
        name: 'repeat',
        type: 'number',
        required: true,
        error: false,
        constraints: {
          numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: -1
          }
        }
      },
      color: {
        value: '#ff0000',
        name: 'color',
        type: 'text',
        required: true,
        error: false,
        constraints: {}
      },
    }
  }
}
