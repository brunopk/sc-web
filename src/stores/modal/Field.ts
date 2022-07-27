export type Field = {
  value: string | number
  name: string,
  type: 'text' | 'number'
  required: boolean
  error: boolean
  constraints: object
}
