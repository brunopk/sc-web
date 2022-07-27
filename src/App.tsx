import React, { ComponentClass } from 'react'
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider'
import Customization from './pages/customization'
import Effects from './pages/effects'
import Devices from './pages/devices'
import Login from './pages/login'
import Dashboard from './pages'
import PrivateRoute from './components/routing'
import { makeTheme } from 'bootstrap-styled/lib/theme'
import { withOrientationChange } from 'react-device-detect'
import { Switch, Route, Redirect } from 'react-router-dom'
import { StoreProvider } from './context'
import { ROUTES, COLOR } from './constants'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import './colors.css'
import './App.css'

type DashboardWithOrientationType = ComponentClass<{children?: any}>

const theme = makeTheme({
  '$brand-primary': COLOR.MATERIAL_BLUE,
  '$grid-gutter-width': '0px'
})

function App() {
  const DashboardWithOrientation = withOrientationChange(Dashboard) as DashboardWithOrientationType
  return (
    <BootstrapProvider theme={theme}>
      <StoreProvider>
        <Switch>
          {
            /* Note how these two routes are ordered. The more specific
        path="/contact/:id" comes before path="/contact" so that
        route will render when viewing an individual contact
            <Route path="/contact/:id">
                <Contact />
            </Route>
            <Route path="/contact">
                <AllContacts />
            </Route>  */

            /* If none of the previous routes render anything,
        this route acts as a fallback.

        Important: A route with path="/" will *always* match
        the URL because all URLs begin with a /. So that's
        why we put this one last of all */
          }
          <PrivateRoute path={ROUTES.HOME}>
            <DashboardWithOrientation />
          </PrivateRoute>
          <PrivateRoute path={ROUTES.NOT_FOUND}>
            <DashboardWithOrientation>
              Not found
            </DashboardWithOrientation>
          </PrivateRoute>
          <PrivateRoute path={ROUTES.EFFECTS}>
            <DashboardWithOrientation>
              <Effects />
            </DashboardWithOrientation>
          </PrivateRoute>
          <PrivateRoute path={ROUTES.CUSTOMIZATION}>
            <DashboardWithOrientation>
              <Customization />
            </DashboardWithOrientation>
          </PrivateRoute>
          <PrivateRoute path={ROUTES.DEVICES}>
            <DashboardWithOrientation>
              <Devices />
            </DashboardWithOrientation>
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Redirect to={{ pathname: ROUTES.NOT_FOUND }} />
          </Route>
        </Switch>
      </StoreProvider>
    </BootstrapProvider>
  )
}

export default App
