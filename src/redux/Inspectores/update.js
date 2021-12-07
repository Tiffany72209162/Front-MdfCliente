import { combineReducers } from 'redux'
import {
  INSPECTOR_UPDATE_ERROR,
  INSPECTOR_UPDATE_SUCCESS,
  INSPECTOR_UPDATE_RESET
} from '../../Actions/Inspector/update'

const error = (state = null, action) => {
  switch (action.type) {
    case INSPECTOR_UPDATE_ERROR:
      return action.error // estado enviado por mis acciones
    case INSPECTOR_UPDATE_RESET:
      return null
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case INSPECTOR_UPDATE_SUCCESS:
      return action.data
    case INSPECTOR_UPDATE_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  error, data
})
