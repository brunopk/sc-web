import { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { StoreContext } from '../context'

/**
 * Force to login again and redirects to the current location (before login).
 * @returns {Function} forceLogin
 */
function useForceLogin() {
  const location = useLocation()
  const history = useHistory()
  const [doRedirect, setDoRedirect] = useState(false)
  const { store } = useContext(StoreContext)

  useEffect(() => {
    if (doRedirect) {
      if (store) store.userToken = undefined
      history.replace(location.pathname)
    }
  }, [doRedirect])

  return () => setDoRedirect(true)
}

export default useForceLogin
