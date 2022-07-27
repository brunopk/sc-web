import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { Alert } from '@bootstrap-styled/v4'
import { ApiError } from '../../api'
import { setBodyClass, setRootClass } from '../../utils/css'
import { COLOR } from '../../constants'
import useLogin from '../../hooks/UseLogin'
import Logo from '../../components/logo'
import Loader from '../../components/loader'
import './Login.css'
import * as BootstrapComponents from '@bootstrap-styled/v4'

const { Input, InputGroup } = BootstrapComponents

const Form = styled(BootstrapComponents.Form)`
  ${() => `background-color: ${COLOR.GRAY10}`};
`

const Button = styled(BootstrapComponents.Button)`
  width: 100%;
`

function Login() {
  // TODO: show error messages not directly from API (map error codes to strings)
  const [isFetching, isError, loginResult, login, loginReset] = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [masterAddress, setMasterAddress] = useState(localStorage.getItem('masterAddress'))
  const [masterPort, setMasterPort] = useState(localStorage.getItem('masterPort'))

  // TODO: use store instead of local storage
  // eslint-disable-next-line no-shadow
  const onSubmit = (event, masterAddress, masterPort, username, password) => {
    event.preventDefault()
    localStorage.setItem('masterAddress', masterAddress)
    localStorage.setItem('masterPort', masterPort)
    login({ username, password })
  }
  // eslint-disable-next-line no-shadow
  const onChangeMasterAddress = (masterAddress) => {
    loginReset()
    setMasterAddress(masterAddress)
  }
  // eslint-disable-next-line no-shadow
  const onChangeMasterPort = (masterPort) => {
    loginReset()
    setMasterPort(masterPort)
  }
  // eslint-disable-next-line no-shadow
  const onChangeUsername = (username) => {
    loginReset()
    setUsername(username)
  }
  // eslint-disable-next-line no-shadow
  const onChangePassword = (password) => {
    loginReset()
    setPassword(password)
  }

  setBodyClass('text-center')
  if (isFetching) {
    setRootClass('root-loader')
  } else {
    setRootClass('root-login')
  }

  return isFetching ? (
    <Loader />
  ) : (
    <Form id="form-login" onSubmit={(event) => onSubmit(event, masterAddress, masterPort, username, password)}>
      <div className="form-signin">
        <img className="mb-4" src="/logo72.png" alt="" width="72" height="72" />
        <Logo />
        <Alert className={`${isError ? 'visible' : 'invisible'}`} color="danger">
          {loginResult !== null && loginResult instanceof ApiError ? loginResult.httpStatusText : ''}
          {loginResult !== null && !(loginResult instanceof ApiError) ? 'Error' : ''}
        </Alert>
        <InputGroup className="mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">MASTER</span>
          </div>
          <Input
            type="text"
            className="form-control w-25"
            placeholder="IP/Hostname"
            aria-label="IP/Hostname"
            value={masterAddress}
            onChange={(event) => onChangeMasterAddress(event.target.value)}
            required />
          <Input
            type="number"
            className="form-control"
            placeholder="Port"
            aria-label="Port"
            value={masterPort}
            onChange={(event) => onChangeMasterPort(event.target.value)}
            required />
        </InputGroup>
        <InputGroup className="mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <input
            id="inputEmail"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(event) => onChangeUsername(event.target.value)}
            required />
        </InputGroup>
        <InputGroup className="mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">
              <FontAwesomeIcon icon={faKey} />
            </span>
          </div>
          <Input
            id="inputPassword"
            type="password"
            className="form-control"
            value={password}
            placeholder="Password"
            onChange={(event) => onChangePassword(event.target.value)}
            required />
        </InputGroup>
        <Button type="submit">ENTER</Button>
      </div>
    </Form>
  )
}

export default Login
