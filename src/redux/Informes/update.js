import { combineReducers } from 'redux'
import {
  INFORME_UPDATE_ERROR,
  INFORME_UPDATE_SUCCESS,
  INFORME_UPDATE_RESET
} from './../../Actions/Informes/update'

const error = (state = null, action) => {
  switch (action.type) {
    case INFORME_UPDATE_ERROR:
      return action.error // estado enviado por mis acciones
    case INFORME_UPDATE_RESET:
      return null
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case INFORME_UPDATE_SUCCESS:
      return action.data
    case INFORME_UPDATE_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  error, data
})
