import axios from 'axios'

export const ORDEN_CREATE_ERROR = 'ORDEN_CREATE_ERROR'
export const ORDEN_CREATE_LOADING = 'ORDEN_CREATE_LOADING'
export const ORDEN_CREATE_SUCCESS = 'ORDEN_CREATE_SUCCESS'
export const ORDEN_CREATE_RESET = 'ORDEN_CREATE_RESET'

export const error = (error) => ({
  type: ORDEN_CREATE_ERROR,
  error
})

export const loading = (loading) => ({
  type: ORDEN_CREATE_LOADING,
  loading
})

export const success = (data) => ({
  type: ORDEN_CREATE_SUCCESS,
  data
})

export const reset = () => ({
  type: ORDEN_CREATE_RESET
})
// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const create = (url, data) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    dispatch(loading(true))
    axios({
      method: 'POST',
      url,
      headers: {
        Authorization: Token // AppSessions.GetSessions()
      },
      data
    })
      .then(res => {
        dispatch(success(res.data))
        dispatch(loading(false))
      })
      .catch(err => {
        dispatch(error(err))
      })
  }
}
