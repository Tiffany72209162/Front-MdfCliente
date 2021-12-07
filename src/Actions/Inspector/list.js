import axios from 'axios'
// import { AppSessions } from 'libs/sessions'

export const INSPECTOR_LIST_ERROR = 'INSPECTOR_LIST_ERROR'
export const INSPECTOR_LIST_LOADING = 'INSPECTOR_LIST_LOADING'
export const INSPECTOR_LIST_SUCCESS = 'INSPECTOR_LIST_SUCCESS'
export const INSPECTOR_LIST_RESET = 'INSPECTOR_LIST_RESET'
export const INSPECTOR_LIST_PAGINATION = 'INSPECTOR_LIST_PAGINATION'
export const INSPECTOR_LIST_SEARCH = 'INSPECTOR_LIST_SEARCH'

export const error = (error) => ({
  type: INSPECTOR_LIST_ERROR, // tipo
  error // estado
})

export const loading = (loading) => ({
  type: INSPECTOR_LIST_LOADING,
  loading
})

export const success = (data) => ({
  type: INSPECTOR_LIST_SUCCESS,
  data
})

export const pagination = (parms) => ({
  type: INSPECTOR_LIST_PAGINATION,
  parms
})

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const list = (url = '', parms = {}) => {  
const Token = 'token ' + localStorage.getItem('data')
console.log(Token)
  return (dispatch) => {
    dispatch(loading(true))
    axios.get(url, {
      headers: {
        Authorization: Token // AppSessions.GetSessions()
      }
    })
      .then(res => {
        dispatch(success(res.data))
        dispatch(pagination(parms))
        dispatch(loading(false))
      })
      .catch(err => console.log(err))
  }
}
