import axios from 'axios'

export const INSPECTOR_UPDATE_ERROR = 'INSPECTOR_UPDATE_CREATE_SUCCESS'
export const INSPECTOR_UPDATE_SUCCESS = 'INSPECTOR_UPDATE_SUCCESS'
export const INSPECTOR_UPDATE_RESET = 'INSPECTOR_UPDATE_RESET'

export const error = (error) => ({
  type: INSPECTOR_UPDATE_ERROR,
  error
})

export const success = (data) => ({
  type: INSPECTOR_UPDATE_SUCCESS,
  data
})

export const reset = () => ({
  type: INSPECTOR_UPDATE_RESET
})

// redux-thunk => permite escribir creadores de acciones que devuelvan una función en lugar de una acción
export const update = (url, data) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    /*
    axios.put(url, data, {
      headers: {
        Authorization: Token
      }
    })
      .then(res => {
        dispatch(success(res.data))
      })
      .catch(err => {
        dispatch(error(err))
      })
    */
    axios.put(url, data)
    .then(res => {
      dispatch(success(res.data))
    })
    .catch(err => {
      dispatch(error(err))
    })
  }
}
