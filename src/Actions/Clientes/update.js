import { DatabaseTwoTone } from '@ant-design/icons'
import axios from 'axios'

export const CLIENTE_UPDATE_ERROR = 'CLIENTE_UPDATE_CREATE_SUCCESS'
export const CLIENTE_UPDATE_SUCCESS = 'CLIENTE_UPDATE_SUCCESS'
export const CLIENTE_UPDATE_RESET = 'CLIENTE_UPDATE_RESET'

export const error = (error) => ({
  type: CLIENTE_UPDATE_ERROR,
  error
})

export const success = (data) => ({
  type: CLIENTE_UPDATE_SUCCESS,
  data
})

export const reset = () => ({
  type: CLIENTE_UPDATE_RESET
})

export const update = (url, data) => {
  const Token = 'token ' + localStorage.getItem('data')
  return (dispatch) => {
    /*axios.put(url, data, {
      headers: {
        Authorization: Token
      }
    })
      .then(res => {
        dispatch(success(res.data))
      })
      .catch(err => {
        dispatch(error(err))
      })*/
    //console.log("axios->put: ", url);
    //console.log("axios->data: ", DatabaseTwoTone);
    
    axios.put(url, data)
    .then(res => {
      dispatch(success(res.data))
    })
    .catch(err => {
      dispatch(error(err))
    })
  }
}