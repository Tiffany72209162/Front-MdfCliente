import { Select, Form, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const ProvinciaInspector = ({  departamentoId }) => {
  const [departamentos, setDepartamentos] = useState([])  
  const Token = 'token ' + localStorage.getItem('data')

  const getDepartamento = () => {
    if(departamentoId === 0){
      setDepartamentos([])
      return
    }
    const url = `http://127.0.0.1:8000/api/ubigeo/?id&departamento=${departamentoId}&provincia=&distrito=0`
    axios.get(url,{
      headers: {
        Authorization: Token
      }})
      .then(response => {
        setDepartamentos(response.data)
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getDepartamento()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departamentoId])
  return (
    <div>
        <select className="form-control">
          {departamentos.map(departamento => (
            <option key={departamento.id} value={departamento.provincia} >{departamento.provincia} </option>
          ))}
        </select>
    </div>
  )
}

ProvinciaInspector.propTypes = {
  departamentoId: PropTypes.string
}

export default ProvinciaInspector
