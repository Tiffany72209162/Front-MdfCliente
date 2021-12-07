import { combineReducers } from 'redux'
import {
  ORDEN_UPDATE_ERROR,
  ORDEN_UPDATE_SUCCESS,
  ORDEN_UPDATE_RESET
} from '../../Actions/Ordenes/update'

const error = (state = null, action) => {
  switch (action.type) {
    case ORDEN_UPDATE_ERROR:
      return action.error // estado enviado por mis acciones
    case ORDEN_UPDATE_RESET:
      return null
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case ORDEN_UPDATE_SUCCESS:
      return action.data
    case ORDEN_UPDATE_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  error, data
})
