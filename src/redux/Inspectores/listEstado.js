import { combineReducers } from 'redux'
import {
  INSPECTOR_LIST_ERROR,
  INSPECTOR_LIST_LOADING,
  INSPECTOR_LIST_SUCCESS,
  INSPECTOR_LIST_RESET
} from '../../Actions/Inspector/listEstado'

const error = (state = null, action) => {
  switch (action.type) {
    case INSPECTOR_LIST_ERROR:
      return action.error // estado enviado por mis acciones
    case INSPECTOR_LIST_RESET:
      return state
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case INSPECTOR_LIST_LOADING:
      return action.loading
    case INSPECTOR_LIST_RESET:
      return state
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case INSPECTOR_LIST_SUCCESS:
      return action.data
    case INSPECTOR_LIST_RESET:
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
