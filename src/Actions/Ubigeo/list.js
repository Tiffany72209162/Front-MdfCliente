import axios from 'axios'

export const UBIGEO_LIST_ERROR = 'UBIGEO_LIST_ERROR'
export const UBIGEO_LIST_LOADING = 'UBIGEO_LIST_LOADING'
export const UBIGEO_LIST_SUCCESS = 'UBIGEO_LIST_SUCCESS'
export const UBIGEO_LIST_TYPE = 'UBIGEO_LIST_TYPE'
export const UBIGEO_LIST_CURRENT = 'UBIGEO_LIST_CURRENT'

export const error = (error) => ({
  type: UBIGEO_LIST_ERROR,
  error
})

export const loading = (loading) => ({
  type: UBIGEO_LIST_LOADING,
  loading
})

export const success = (data) => ({
  type: UBIGEO_LIST_SUCCESS,
  data
})

export const type = (data) => ({
  type: UBIGEO_LIST_TYPE,
  data
})

export const current = (data) => ({
  type: UBIGEO_LIST_CURRENT,
  data
})

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
      .catch(err => {
        dispatch(error(err))
      })
  }
}
