import { makeObservable, observable, action } from 'mobx'
import { Option } from '../../../components/selection/types'
import Wizard from '../../../stores/wizard'
import SelectionModes from '../SelectionModes'

export default class DeletionWizard extends Wizard {
  public selectionMode: Option

  constructor(maxSteps: number) {
    super(maxSteps)
    makeObservable(this, {
      selectionMode: observable,
      changeSelectionMode: action
    })
    // TODO: replace with correct default option
    this.selectionMode = SelectionModes.BY_COLOR
  }

  changeSelectionMode(option: Option) {
    this.selectionMode = option
  }
}
