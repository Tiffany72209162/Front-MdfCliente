import { combineReducers } from 'redux'
import {
  CLIENTE_CREATE_ERROR,
  CLIENTE_CREATE_LOADING,
  CLIENTE_CREATE_SUCCESS,
  CLIENTE_CREATE_RESET
} from '../../Actions/Clientes/create'

const error = (state = null, action) => {
  switch (action.type) {
    case CLIENTE_CREATE_ERROR:
      return action.error // estado enviado por mis acciones
    case CLIENTE_CREATE_RESET:
      return null
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case CLIENTE_CREATE_LOADING:
      return action.loading
    case CLIENTE_CREATE_RESET:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case CLIENTE_CREATE_SUCCESS:
      return action.data
    case CLIENTE_CREATE_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})
