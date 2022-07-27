import React, { useEffect, useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { faPlus, faCompressAlt, faUndo, faMinus } from '@fortawesome/free-solid-svg-icons'
import { saveToSessionStorage } from '../../utils'
import { DashboardContext, StoreContext } from '../../context'
import DeletionWizard from './wizards'
import { Section } from './components'
import SectionCreator from './modals'
import './Customization.css'

// TODO: form validation for modal (SectionDefinition)
// TODO: call API in onToggle function
// TODO: Run validations (overlapping, limits, etc) before adding/removing sections
// TODO: use separated components in separated files (DeletionWizard, etc)
// TODO: use styled components for instance to define button colors etc.
// TODO: use Row, Container and Dropdown component
// TODO: fix bug when pressing back button on the browser while some modal is opened
// TODO: fix top navbar not visible when scrolling down
// TODO: dont use FormContextProvider

/* ********************************************************************************************************************
 *                                                      Constants                                                     *
 ******************************************************************************************************************** */

const INITIAL_STATE = {
  currentSectionList: [
    { color: '#aabbaa', start: 0, end: 10, isOn: true },
    { color: '#aabbaa', start: 0, end: 10, isOn: true },
    { color: '#aabbaa', start: 0, end: 10, isOn: true },
    { color: '#aabbaa', start: 0, end: 10, isOn: true },
    { color: '#aabbaa', start: 0, end: 10, isOn: true }
  ],
  previousSectionList: [],
}

/* function reducer(state, action) {
  switch (action.type) {
    case ACTION.LOAD_STATE_FROM_SESSION_STORAGE: {
      const loadedState = loadFromSessionStorage('state')
      return loadedState || INITIAL_STATE
    } case ACTION.GENERATE_LIST_OF_SECTIONS_TO_REMOVE: {
      const sectionsToDelete = []
      const { deleteBy, color, to, from } = action.payload

      switch (deleteBy) {
        case DELETE_BY_COLOR:
          state.currentSectionList.forEach((s, index) => {
            if (s.color === color) {
              sectionsToDelete.push(index)
            }
          })
          break
        case DELETE_BETWEEN:
          state.currentSectionList.forEach((s, index) => {
            if (s.start >= from && s.end <= to) {
              sectionsToDelete.push(index)
            }
          })
          break
        default:
          throw new Error(`Invalid delete option ${deleteBy}`)
      }
      return { ...state, sectionsToDelete }
    } case ACTION.ADD_SECTIONS: {
      const sectionsToAdd = state.sectionsToAdd.map((s) => ({ ...s, isNew: true, isOn: true }))
      const newList = sortSections(state.currentSectionList.concat(sectionsToAdd)).map((s, index) => ({
        ...s,
        onToggle: (dispatch) => dispatch({ type: ACTION.TURN_SECTION_ON_OR_OFF, payload: index })
      }))

      return {
        currentSectionList: newList,
        previousSectionList: [state.currentSectionList, ...state.previousSectionList]
      }
    } case ACTION.REMOVE_SECTIONS: {
      const newList = state.currentSectionList.slice()

      state.sectionsToDelete.forEach((i) => {
        newList[i].isDeleted = true
      })

      return {
        currentSectionList: newList,
        previousSectionList: [state.currentSectionList, ...state.previousSectionList]
      }
    } default:
      throw new Error(`Invalid action ${action.type}`)
  }
} */

const SectionList = styled.div`
  :last-child {
    margin-bottom: 8em;
  }
`

export default observer(() => {
  const { store } = useContext(StoreContext)
  const { buttonMenu, setButtonMenu } = useContext(DashboardContext)
  // TODO: set this with result of sending request to API (probably it should be a string)
  const [state] = useState(INITIAL_STATE)
  const [colorList] = useState([])
  // const memoizedDispatch = useCallback((args) => dispatch(args));
  const firstRender = useRef(true)

  // Icons buttons for nav bar
  useEffect(() => {
    const newButtonMenu = buttonMenu.slice()

    if (newButtonMenu.filter((x) => x.icon === faPlus).length === 0) {
      newButtonMenu.push({
        icon: faPlus,
        title: 'New section',
        onClick: () => store?.customization.sectionCreator.open(),
      })
    }

    if (newButtonMenu.filter((x) => x.icon === faMinus).length === 0) {
      newButtonMenu.push({
        icon: faMinus,
        title: 'Delete sections',
        onClick: () => store?.customization.deletionWizard.open()
      })
    }

    if (newButtonMenu.filter((x) => x.icon === faCompressAlt).length === 0) {
      newButtonMenu.push({
        icon: faCompressAlt,
        title: 'Collapse all',
        onClick: () => { throw new Error('Not implemented') },
      })
    }

    if (newButtonMenu.filter((x) => x.icon === faUndo).length === 0) {
      newButtonMenu.push({
        icon: faUndo,
        title: 'Undo',
        onClick: () => { throw new Error('Not implemented') },
      })
    }

    setButtonMenu(newButtonMenu)
  }, [buttonMenu.length])

  useEffect(() => {
    if (!firstRender.current) {
      saveToSessionStorage('state', state)
    }
  }, [JSON.stringify(state)])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    }
  })

  return (
    <>
      <DeletionWizard id="deletionWizard" colorList={colorList} />
      <SectionCreator />
      <SectionList>
        {store?.customization.sections.map((s, index) => (
          <Section {...s} key={index} />
        ))}
      </SectionList>
    </>
  )
})
