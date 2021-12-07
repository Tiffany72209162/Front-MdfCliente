import axios from 'axios'

export const INSPECTOR_LIST_ERROR = 'INSPECTOR_LIST_ERROR'
export const INSPECTOR_LIST_LOADING = 'INSPECTOR_LIST_LOADING'
export const INSPECTOR_LIST_SUCCESS = 'INSPECTOR_LIST_SUCCESS'
export const INSPECTOR_LIST_RESET = 'INSPECTOR_LIST_RESET'

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

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const list = (url = '', request = {}) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    dispatch(loading(true))
    axios.get(url, {
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
