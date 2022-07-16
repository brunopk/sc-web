import React, { createContext, useState } from 'react'
import { chain } from 'lodash'
import { useLocation } from 'react-router-dom'
import { MAIN_MENU, SUB_MENU, MODAL_ID } from '../constants'

const DashboardContext = createContext()

function setOnclickEvent(menuItems, modals, setModals) {
  return menuItems.map((v) => {
    if (v.isModal) {
      return {
        isPath: v.isPath,
        isModal: v.isModal,
        path: v.path,
        label: v.label,
        icon: v.icon,
        onClick: () => generateToggleModalFunction(modals, setModals)(v.modalId) }
    }
    return v
  })
}

function initModals() {
  return chain(MODAL_ID)
    .mapKeys((v) => v)
    .mapValues(() => ({ isOpen: false }))
    .value()
}

function generateToggleModalFunction(modals, setModals) {
  return (modalId) => setModals({ ...initModals(), [modalId]: { isOpen: !modals[modalId].isOpen } })
}

function DashboardContextProvider({ children }) {
  const location = useLocation()
  const [buttonMenu, setButtonMenu] = useState([])
  const [fetching, setFetching] = useState(false)
  const [modals, setModals] = useState(initModals())
  const menu = {
    items: setOnclickEvent(SUB_MENU[location.pathname] || MAIN_MENU, modals, setModals),
    isSubMenu: typeof SUB_MENU[location.pathname] !== 'undefined'
  }
  // eslint-disable-next-line no-shadow
  const generateIsModalOpenedFunction = (modals) => (modalId) => modals[modalId].isOpen

  return (
    <DashboardContext.Provider value={{
      buttonMenu,
      fetching,
      menu,
      isModalOpened: generateIsModalOpenedFunction(modals),
      toggleModal: generateToggleModalFunction(modals, setModals),
      setFetching,
      setButtonMenu }}>
      {children}
    </DashboardContext.Provider>
  )
}

export {
  DashboardContext,
  DashboardContextProvider,
}
