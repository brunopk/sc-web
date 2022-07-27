import { Action } from './Action'

export default class Button {
  text: string

  action: Action

  constructor(text: string, action: Action) {
    this.text = text
    this.action = action
  }
}
