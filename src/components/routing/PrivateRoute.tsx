import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { StoreContext } from '../../context'

/**
 * Check authentication and redirect
 * @param {*} token token
 * @param {*} location the component the user wants to go
 * @param {*} locationData information about the component the user wants to go
 * (see Redirect component on react-router-dom)
 */
function checkAuthenticationAndRedirect(token, location, locationData) {
  // Every request should redirect to login in case of server returns a "Forbidden" error
  return token != null ? (location) : <Redirect to={{ pathname: '/login', state: { from: locationData } }} />
}

/**
 * Wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
 * children: is the component to be redirected (if user is already logged in)
 * location: contains data of the component where the user comes from
 * @param {*} param0
 */
function PrivateRoute({ children, ...rest }) {
  const { store } = useContext(StoreContext)
  return (
    <Route
      {...rest}
      render={({ location }) => checkAuthenticationAndRedirect(store?.userToken, children, location)} />
  )
}

export default PrivateRoute
