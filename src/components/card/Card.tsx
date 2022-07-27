import React from 'react'
import { nanoid } from 'nanoid'
import * as BootstrapComponents from '@bootstrap-styled/v4'
import Context from './Context'

export default function Card({ children, expanded = true, expandible = false }) {
  const id = nanoid()
  const cardBodyId = `cb-${id}`
  const cardHeaderId = `ch-${id}`
  return (
    <Context.Provider value={{ expanded, expandible, cardBodyId, cardHeaderId }}>
      <BootstrapComponents.Card>
        {children}
      </BootstrapComponents.Card>
    </Context.Provider>
  )
}
