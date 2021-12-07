import axios from 'axios'
// import { AppSessions } from 'libs/sessions'

export const REPORTE_LIST_ERROR = 'REPORTE_LIST_ERROR'
export const REPORTE_LIST_LOADING = 'REPORTE_LIST_LOADING'
export const REPORTE_LIST_SUCCESS = 'REPORTE_LIST_SUCCESS'
export const REPORTE_LIST_RESET = 'REPORTE_LIST_RESET'
export const REPORTE_LIST_PAGINATION = 'REPORTE_LIST_PAGINATION'
export const REPORTE_LIST_SEARCH = 'REPORTE_LIST_SEARCH'

export const error = (error) => ({
  type: REPORTE_LIST_ERROR, // tipo
  error // estado
})

export const loading = (loading) => ({
  type: REPORTE_LIST_LOADING,
  loading
})

export const success = (data) => ({
  type: REPORTE_LIST_SUCCESS,
  data
})

export const pagination = (parms) => ({
  type: REPORTE_LIST_PAGINATION,
  parms
})

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const list = (url = '', parms = {}) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    dispatch(loading(true))
    axios({
      method: 'GET',
      headers: {
        Authorization: Token // AppSessions.GetSessions()
      },
      url
    })
      .then(res => {
        dispatch(success(res.data))
        dispatch(pagination(parms))
        dispatch(loading(false))
      })
      .catch(err => console.log(err))
  }
}
