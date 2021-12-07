import axios from 'axios'

export const INFORME_UPDATE_ERROR = 'INFORME_UPDATE_CREATE_SUCCESS'
export const INFORME_UPDATE_SUCCESS = 'INFORME_UPDATE_SUCCESS'
export const INFORME_UPDATE_RESET = 'INFORME_UPDATE_RESET'

export const error = (error) => ({
  type: INFORME_UPDATE_ERROR,
  error
})

export const success = (data) => ({
  type: INFORME_UPDATE_SUCCESS,
  data
})

export const reset = () => ({
  type: INFORME_UPDATE_RESET
})

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const update = (url, data) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    axios({
      method: 'PUT',
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
