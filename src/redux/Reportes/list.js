import { combineReducers } from 'redux'
import {
  REPORTE_LIST_ERROR,
  REPORTE_LIST_LOADING,
  REPORTE_LIST_SUCCESS,
  REPORTE_LIST_PAGINATION
} from '../../Actions/Reportes/list'

const error = (state = null, action) => {
  switch (action.type) {
    case REPORTE_LIST_ERROR:
      return action.error // estado enviado por mis acciones
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case REPORTE_LIST_LOADING:
      return action.loading
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case REPORTE_LIST_SUCCESS:
      return action.data
    default:
      return state
  }
}

const pagination = (state = {}, action) => {
  switch (action.type) {
    case REPORTE_LIST_PAGINATION:
      return action.parms
    default:
      return state
  }
}
export default combineReducers({
  error, loading, data, pagination
})
