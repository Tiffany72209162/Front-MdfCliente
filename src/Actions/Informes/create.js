import axios from 'axios'

export const INFORME_CREATE_ERROR = 'INFORME_CREATE_ERROR'
export const INFORME_CREATE_LOADING = 'INFORME_CREATE_LOADING'
export const INFORME_CREATE_SUCCESS = 'INFORME_CREATE_SUCCESS'
export const INFORME_CREATE_RESET = 'INFORME_CREATE_SUCCESS'

const Token = localStorage.getItem('data')
export const error = (error) => ({
  type: INFORME_CREATE_ERROR,
  error
})

export const loading = (loading) => ({
  type: INFORME_CREATE_LOADING,
  loading
})

export const success = (data) => ({
  type: INFORME_CREATE_SUCCESS,
  data
})

export const reset = () => ({
  type: INFORME_CREATE_RESET
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
        Authorization: Token
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
