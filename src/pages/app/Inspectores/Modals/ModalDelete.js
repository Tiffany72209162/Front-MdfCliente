import React from 'react'
import { DeleteFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { update as updateInspector } from '../../../../Actions/Inspector/update'
import PropTypes from 'prop-types'
import axios from 'axios'
import { url } from '../../../../config/Url'
const Token = 'token ' + localStorage.getItem('data')

ModalDelete.propTypes = {
  idInspector: PropTypes.number
}
function ModalDelete ({ idInspector }) {
  const dispatch = useDispatch()
  const onDelete = () => {
    axios({
      method: 'GET', url
    })
      .then(response => {
        console.log(response.data)
        dispatch(updateInspector(url + `/inspector/${idInspector}/`, { headers: {
          Authorization: Token
        }}, dataForDelete(response.data)))
      }).catch(error => {
        console.log(error)
      })
  }
  const dataForDelete = (values) => {
    if (values.estado === 'ACT') {
      values.estado = 'INA'
    } else {
      values.estado = 'ACT'
    }
    return values
  }
  return (
    <>
    <Button onClick={onDelete} type='danger' size='middle' shape='circle' icon={<DeleteFilled />} />
    </>
  )
}

export default ModalDelete
