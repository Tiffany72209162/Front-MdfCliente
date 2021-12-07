import { combineReducers } from 'redux'
import {
  ORDEN_LIST_ERROR,
  ORDEN_LIST_LOADING,
  ORDEN_LIST_SUCCESS,
  ORDEN_LIST_RESET
} from '../../Actions/Ordenes/list'

const error = (state = null, action) => {
  switch (action.type) {
    case ORDEN_LIST_ERROR:
      return action.error // estado enviado por mis acciones
    case ORDEN_LIST_RESET:
      return state
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case ORDEN_LIST_LOADING:
      return action.loading
    case ORDEN_LIST_RESET:
      return state
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case ORDEN_LIST_SUCCESS:
      return action.data
    case ORDEN_LIST_RESET:
      return state
    default:
      return state
  }
}

export default combineReducers({
  error,
  loading,
  data
})
