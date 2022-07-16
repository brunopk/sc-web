import { makeObservable, action, observable } from 'mobx'
import Customization from '../pages/customization/stores/Customization'
import Devices from '../pages/devices/stores/Devices'

// Using "import Customization from '../pages/customization/stores'" causes error

export default class RootStore {
  numberOfLed: number

  deviceOn: boolean

  userToken?: string

  // page stores

  customization: Customization

  devices: Devices

  // TODO: periodically check device status and set an observable variable "deviceStatus"
  constructor() {
    makeObservable(this, {
      userToken: observable,
      toggleDeviceButton: action
    })
    this.customization = new Customization()
    this.devices = new Devices(this)
    // TODO: set corresponding number of led and use the corresponding mobx annotation
    this.numberOfLed = 300
    this.deviceOn = false
  }

  toggleDeviceButton() {
    console.log('Call API')
    this.deviceOn = !this.deviceOn
  }

  // eslint-disable-next-line class-methods-use-this
  private isAnyModalOpen(): boolean {
    // TODO:
    return false
  }
}
