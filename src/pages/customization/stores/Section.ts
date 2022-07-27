export default class Section {
  start: number

  end: number

  color: string

  isOn: boolean

  isEditable: boolean

  constructor(start:number, end:number, color:string) {
    this.start = start
    this.end = end
    this.color = color
    this.isOn = false
    this.isEditable = false
  }
}
