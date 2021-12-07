import { combineReducers } from 'redux'
import {
  INFORME_LIST_ERROR,
  INFORME_LIST_LOADING,
  INFORME_LIST_SUCCESS,
  INFORME_LIST_PAGINATION
} from './../../Actions/Informes/list'

const error = (state = null, action) => {
  switch (action.type) {
    case INFORME_LIST_ERROR:
      return action.error // estado enviado por mis acciones
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case INFORME_LIST_LOADING:
      return action.loading
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case INFORME_LIST_SUCCESS:
      return action.data
    default:
      return state
  }
}

const pagination = (state = {}, action) => {
  switch (action.type) {
    case INFORME_LIST_PAGINATION:
      return action.parms
    default:
      return state
  }
}
export default combineReducers({
  error, loading, data, pagination
})
