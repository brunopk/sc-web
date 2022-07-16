import React, { useEffect, useContext, useState, useRef } from 'react'
import { loadFromSessionStorage, saveToSessionStorage } from '../../utils'
import { DashboardContext } from '../../context'
import DeviceWizard from './DeviceWizard'
import './Devices.css'
import Device from './components'

// TODO: Device name and led number should come from API
// TODO: implement onClick event for edit and power off buttons
// TODO: use the same label component as in Section component for device attributes

const SESSION_STORAGE_OBJECT_KEY = 'devices'

// eslint-disable-next-line func-names
export default function () {
  const firstRender = useRef(true)
  const [devices, setDevices] = useState([])
  const { setButtonMenu } = useContext(DashboardContext)
  // const { deviceError } = useContext(MainContext);

  // TODO: generalize this maybe with custom hooks or just with mobx store
  useEffect(() => {
    setButtonMenu([])
  }, [])

  useEffect(() => {
    if (!firstRender.current) {
      saveToSessionStorage(SESSION_STORAGE_OBJECT_KEY, devices)
    }
  }, devices)

  useEffect(() => {
    if (firstRender.current) {
      setDevices(loadFromSessionStorage(SESSION_STORAGE_OBJECT_KEY) || [])
      firstRender.current = false
    }
  })

  return (
    <>
      <DeviceWizard />
      <Device />
    </>
  )
}
