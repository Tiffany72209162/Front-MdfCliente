import { combineReducers } from 'redux'
import {
  INFORME_CREATE_ERROR,
  INFORME_CREATE_LOADING,
  INFORME_CREATE_SUCCESS,
  INFORME_CREATE_TOKEN,
  INFORME_CREATE_RESET
} from '../../Actions/Login/login'

const error = (state = null, action) => {
  switch (action.type) {
    case INFORME_CREATE_ERROR:
      return action.error // estado enviado por mis acciones
    case INFORME_CREATE_RESET:
      return null
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case INFORME_CREATE_LOADING:
      return action.loading
    case INFORME_CREATE_RESET:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case INFORME_CREATE_SUCCESS:
      return action.data
    case INFORME_CREATE_TOKEN:
      return action.data.token
    case INFORME_CREATE_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})
