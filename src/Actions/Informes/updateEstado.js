import axios from 'axios'

export const ORDEN_UPDATE_ERROR = 'ORDEN_UPDATE_CREATE_SUCCESS'
export const ORDEN_UPDATE_SUCCESS = 'ORDEN_UPDATE_SUCCESS'
export const ORDEN_UPDATE_RESET = 'ORDEN_UPDATE_RESET'

export const error = (error) => ({
  type: ORDEN_UPDATE_ERROR,
  error
})

export const success = (data) => ({
  type: ORDEN_UPDATE_SUCCESS,
  data
})

export const reset = () => ({
  type: ORDEN_UPDATE_RESET
})

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const updateEstado = (url, data) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url,
      headers: {
        Authorization: Token // AppSessions.GetSessions()
      },
      data
    })
      .then(res => {
        dispatch(success(res.data))
      })
      .catch(err => {
        dispatch(error(err))
      })
  }
}
