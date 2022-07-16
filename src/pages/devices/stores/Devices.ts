import { makeObservable } from 'mobx'
import RootStore from '../../../stores'

export default class Devices {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeObservable(this, {})
    this.rootStore = rootStore
  }
}
