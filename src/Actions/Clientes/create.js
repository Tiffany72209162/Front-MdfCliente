import axios from 'axios'

export const CLIENTE_CREATE_ERROR = 'CLIENTE_CREATE_ERROR'
export const CLIENTE_CREATE_LOADING = 'CLIENTE_CREATE_LOADING'
export const CLIENTE_CREATE_SUCCESS = 'CLIENTE_CREATE_SUCCESS'
export const CLIENTE_CREATE_RESET = 'CLIENTE_CREATE_SUCCESS'

export const error = (error) => ({
  type: CLIENTE_CREATE_ERROR,
  error
})

export const loading = (loading) => ({
  type: CLIENTE_CREATE_LOADING,
  loading
})

export const success = (data) => ({
  type: CLIENTE_CREATE_SUCCESS,
  data
})

export const reset = () => ({
  type: CLIENTE_CREATE_RESET
})

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
      console.log("res -->", res.data);
      dispatch(success(res.data))
      dispatch(loading(false))
    })
    .catch(err => {
      dispatch(error(err))
    })
  }
}