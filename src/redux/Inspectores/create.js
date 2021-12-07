import { combineReducers } from 'redux'
import {
  INSPECTOR_CREATE_ERROR,
  INSPECTOR_CREATE_LOADING,
  INSPECTOR_CREATE_SUCCESS,
  INSPECTOR_CREATE_RESET
} from '../../Actions/Inspector/create'

const error = (state = null, action) => {
  switch (action.type) {
    case INSPECTOR_CREATE_ERROR:
      return action.error // estado enviado por mis acciones
    case INSPECTOR_CREATE_RESET:
      return null
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case INSPECTOR_CREATE_LOADING:
      return action.loading
    case INSPECTOR_CREATE_RESET:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case INSPECTOR_CREATE_SUCCESS:
      return action.data
    case INSPECTOR_CREATE_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})
