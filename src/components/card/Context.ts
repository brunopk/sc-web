import { createContext } from 'react'

type ContextProps = {
  expanded?: boolean
  expandible?: boolean
  cardHeaderId?: string
  cardBodyId?: string
}

export default createContext<ContextProps>({})
