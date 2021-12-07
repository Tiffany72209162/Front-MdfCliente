import axios from 'axios'

export const CLIENTE_LIST_ERROR = 'CLIENTE_LIST_ERROR'
export const CLIENTE_LIST_LOADING = 'CLIENTE_LIST_LOADING'
export const CLIENTE_LIST_SUCCESS = 'CLIENTE_LIST_SUCCESS'
export const CLIENTE_LIST_RESET = 'CLIENTE_LIST_RESET'
export const CLIENTE_LIST_PAGINATION = 'CLIENTE_LIST_PAGINATION'
export const CLIENTE_LIST_SEARCH = 'CLIENTE_LIST_SEARCH'

export const error = (error) => ({
  type: CLIENTE_LIST_ERROR, // tipo
  error // estado
})

export const loading = (loading) => ({
  type: CLIENTE_LIST_LOADING,
  loading
})

export const success = (data) => ({
  type: CLIENTE_LIST_SUCCESS,
  data
})

export const pagination = (parms) => ({
  type: CLIENTE_LIST_PAGINATION,
  parms
})

export const list = (url = '', parms = {}) => {  
  
  const Token = 'token ' + localStorage.getItem('data')
  //console.log(Token)
    return (dispatch) => {
      dispatch(loading(true))
      
      axios.get(url, {
        headers: {
          Authorization: Token // AppSessions.GetSessions()
        }
      })
        .then(res => {
          dispatch(success(res.data))
          dispatch(pagination(parms))
          dispatch(loading(false))
        })
        .catch(err => console.log(err))
      
      /*axios.get(url)
      .then(res => {
        dispatch(success(res.data))
        dispatch(pagination(parms))
        dispatch(loading(false))
      })
      .catch(err => console.log(err))*/
    }
}