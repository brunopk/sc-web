import { useReducer, useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { StoreContext } from '../context'
import { getToken } from '../api/common'

const A_FETCH_SET_PARAM = 'FETCH_SET_PARAM'
const A_FETCH_INIT = 'FETCH_INIT'
const A_FETCH_SUCCESS = 'FETCH_SUCCESS'
const A_FETCH_FAILURE = 'FETCH_FAILURE'
const A_FETCH_FAILURE_RESET = 'FETCH_FAILURE_RESET'
const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  param: null,
  result: null,
}

function useLogin() {
  const { store } = useContext(StoreContext)
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state as { from: any} || { from: { pathname: '' } }

  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case A_FETCH_SUCCESS:
        return {
          ...prevState,
          isLoading: false,
          result: action.data,
        }
      case A_FETCH_FAILURE:
        return {
          ...prevState,
          isError: true,
          isLoading: false,
          result: action.error,
        }
      case A_FETCH_INIT:
        return {
          ...prevState,
          isLoading: true,
          isError: false,
        }
      case A_FETCH_SET_PARAM:
        return {
          ...prevState,
          param: action.param,
        }
      default:
      case A_FETCH_FAILURE_RESET:
        return INITIAL_STATE
    }
  }, INITIAL_STATE)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: A_FETCH_INIT })
        const res = await getToken({ ...state.param })
        dispatch({ type: A_FETCH_SUCCESS, data: res })
      } catch (error) {
        console.error(error)
        dispatch({ type: A_FETCH_FAILURE, error })
      }
    }
    if (!state.isLoading && !state.isError && state.result == null && state.param !== null) {
      fetchData()
    }
    if (typeof store !== 'undefined' && !state.isError && state.result !== null) {
      store.userToken = state.result.access_token
      history.replace(from)
    }
  }, [state.param, state.result, state.isError, state.isLoading])

  return [
    state.isLoading,
    state.isError,
    state.result,
    (param) => dispatch({ type: A_FETCH_SET_PARAM, param }),
    () => dispatch({ type: A_FETCH_FAILURE_RESET }),
  ]
}

export default useLogin
