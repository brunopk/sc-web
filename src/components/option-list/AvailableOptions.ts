/* eslint-disable no-restricted-globals */

export type Option = {
  name: string
  text: string
}

export class AvailableOptions {
  [name: string]: Option
}
