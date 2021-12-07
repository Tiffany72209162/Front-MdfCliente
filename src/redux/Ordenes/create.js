import { combineReducers } from 'redux'
import {
  ORDEN_CREATE_ERROR,
  ORDEN_CREATE_LOADING,
  ORDEN_CREATE_SUCCESS,
  ORDEN_CREATE_RESET
} from '../../Actions/Ordenes/create'

const error = (state = null, action) => {
  switch (action.type) {
    case ORDEN_CREATE_ERROR:
      return action.error // estado enviado por mis acciones
    case ORDEN_CREATE_RESET:
      return null
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case ORDEN_CREATE_LOADING:
      return action.loading
    case ORDEN_CREATE_RESET:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case ORDEN_CREATE_SUCCESS:
      return action.data
    case ORDEN_CREATE_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})
