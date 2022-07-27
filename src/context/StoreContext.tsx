import React, { createContext } from 'react'
import RootStore from '../stores'

type StoreContextProps = {
  store?: RootStore
}

export const StoreContext = createContext<StoreContextProps>({})

export function StoreProvider({ children }) {
  return (
    <StoreContext.Provider value={{ store: new RootStore() }}>
      {children}
    </StoreContext.Provider>
  )
}
