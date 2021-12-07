import { combineReducers } from 'redux'
import {
  UBIGEO_LIST_ERROR,
  UBIGEO_LIST_LOADING,
  UBIGEO_LIST_SUCCESS,
  UBIGEO_LIST_TYPE,
  UBIGEO_LIST_CURRENT
} from '../../Actions/Ubigeo/list'

const error = (state = null, action) => {
  switch (action.type) {
    case UBIGEO_LIST_ERROR:
      return action.error
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case UBIGEO_LIST_LOADING:
      return action.loading
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case UBIGEO_LIST_SUCCESS:
      return action.data
    default:
      return state
  }
}

const type = (state = 'Init', action) => {
  switch (action.type) {
    case UBIGEO_LIST_TYPE:
      return action.data
    default:
      return state
  }
}

const current = (state = {}, action) => {
  switch (action.type) {
    case UBIGEO_LIST_CURRENT:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  error, loading, data, type, current
})
