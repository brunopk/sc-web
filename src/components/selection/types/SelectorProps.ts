import { Option } from './Option'
import Type from './Type'
import Options from './Options'

export type SelectorProps = {
    type: Type,
    options: Options,
    // eslint-disable-next-line no-unused-vars
    onSelect: (option: Option) => void
}
