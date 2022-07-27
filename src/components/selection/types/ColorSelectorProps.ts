/* eslint-disable no-unused-vars */
import { Color } from './Color'
import Colors from './Colors'

export type ColorSelectorProps = {
    options: Colors,
    onSelect: (option: Color) => void
}
