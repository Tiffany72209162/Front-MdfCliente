import axios from 'axios'

export const INFORME_LIST_ERROR = 'INFORME_LIST_ERROR'
export const INFORME_LIST_LOADING = 'INFORME_LIST_LOADING'
export const INFORME_LIST_SUCCESS = 'INFORME_LIST_SUCCESS'
export const INFORME_LIST_RESET = 'INFORME_LIST_RESET'
export const INFORME_LIST_PAGINATION = 'INFORME_LIST_PAGINATION'
export const INFORME_LIST_SEARCH = 'INFORME_LIST_SEARCH'

export const error = (error) => ({
  type: INFORME_LIST_ERROR, // tipo
  error // estado
})

export const loading = (loading) => ({
  type: INFORME_LIST_LOADING,
  loading
})

export const success = (data) => ({
  type: INFORME_LIST_SUCCESS,
  data
})

export const pagination = (parms) => ({
  type: INFORME_LIST_PAGINATION,
  parms
})

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const list = (url = '', parms = {}) => {
  const Token = 'token ' + localStorage.getItem('data')
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
