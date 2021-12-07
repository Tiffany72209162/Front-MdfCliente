import axios from 'axios'

export const INSPECTOR_CREATE_ERROR = 'INSPECTOR_CREATE_ERROR'
export const INSPECTOR_CREATE_LOADING = 'INSPECTOR_CREATE_LOADING'
export const INSPECTOR_CREATE_SUCCESS = 'INSPECTOR_CREATE_SUCCESS'
export const INSPECTOR_CREATE_RESET = 'INSPECTOR_CREATE_SUCCESS'

export const error = (error) => ({
  type: INSPECTOR_CREATE_ERROR,
  error
})

export const loading = (loading) => ({
  type: INSPECTOR_CREATE_LOADING,
  loading
})

export const success = (data) => ({
  type: INSPECTOR_CREATE_SUCCESS,
  data
})

export const reset = () => ({
  type: INSPECTOR_CREATE_RESET
})
// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const create = (url, data) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    dispatch(loading(true))
    /*
    axios.post(url, data, {
      headers: {
        Authorization: Token
      }
    })
      .then(res => {
        dispatch(success(res.data))
        dispatch(loading(false))
      })
      .catch(err => {
        dispatch(error(err))
    })*/

    axios.post(url, data)
      .then(res => {
        dispatch(success(res.data))
        dispatch(loading(false))
      })
      .catch(err => {
        dispatch(error(err))
    })
  }
}
