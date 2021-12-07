import axios from 'axios'

export const ORDEN_LIST_ERROR = 'ORDEN_LIST_ERROR'
export const ORDEN_LIST_LOADING = 'ORDEN_LIST_LOADING'
export const ORDEN_LIST_SUCCESS = 'ORDEN_LIST_SUCCESS'
export const ORDEN_LIST_RESET = 'ORDEN_LIST_RESET'

export const error = (error) => ({
  type: ORDEN_LIST_ERROR, // tipo
  error // estado
})

export const loading = (loading) => ({
  type: ORDEN_LIST_LOADING,
  loading
})

export const success = (data) => ({
  type: ORDEN_LIST_SUCCESS,
  data
})

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const list = (request = {}) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    dispatch(loading(true))
    axios({
      method: 'GET',
      headers: {
        Authorization: Token // AppSessions.GetSessions()
      },
      ...request
    })
      .then(res => {
        dispatch(success(res.data))
        dispatch(loading(false))
      })
      .catch(err => dispatch(err))
  }
}
