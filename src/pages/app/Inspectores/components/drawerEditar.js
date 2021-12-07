import { Select, Form, Spin, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { url } from '../../../../config/Url'

const DrawerInspector = ({ departamento, provincia, distrito, onEnviar, onProvincia, onDistrito, onDepartamento }) => {
  const [departamentos, setDepartamentos] = useState([])
  const [provincias, setProvincias] = useState([])
  const [distritos, setDistritos] = useState([])
  const [option, setOption] = useState([null])
  const [option1, setOption1] = useState([null])
  const [renderizar, setRenderizar] = useState(false)
  const Token = 'token ' + localStorage.getItem('data')
  useEffect(() => {
    getDepartamento()
  }, [renderizar])
  const getDepartamento = () => {
    if (option !== [null]) {
      axios(url + '/ubigeo/?id=&departamento=&provincia=0&distrito=0', {
        method: 'GET',
        headers: {
          Authorization: Token
        }
      })
        .then(res => {
          setDepartamentos(res.data)
        })
        .catch(err => console.log(err))
    }
  }
  useEffect(() => {
    getProvincia()
  }, [renderizar])
  const getProvincia = () => {
    if (option !== '') {
      axios(url + '/ubigeo/?id=&departamento=' + option + '&provincia=&distrito=0', {
        method: 'GET',
        headers: {
          Authorization: Token
        }
      })
        .then(res => {
          setProvincias(res.data)
        })
        .catch(err => console.log(err))
    }
  }
  useEffect(() => {
    getDistrito()
  }, [renderizar])
  const getDistrito = () => {
    if (option !== [null] && option1 !== [null]) {
      axios(url + '/ubigeo/?id=&departamento=' + option + '&provincia=' + option1 + '&distrito=', {
        method: 'GET',
        headers: {
          Authorization: Token
        }
      })
        .then(res => {
          setDistritos(res.data)
        })
        .catch(err => console.log(err))
    }
  }

  function handleChange (value) {
    setOption(value)
    console.log(option)
    if (option !== value) {
      setProvincias([])
      setDistritos([])
      setRenderizar(!renderizar)
    } else {
      setRenderizar(!renderizar)
    }
  }
  function handleChange1 (value) {
    setOption1(value)
    console.log(value)
    if (option1 !== value) {
      setDistritos([])
      onProvincia(value)
      setRenderizar(!renderizar)
    } else {
      setRenderizar(!renderizar)
    }
  }
  const handleChange2 = (value, key) => {
    console.log(key.key)
    onDistrito(value)
    onEnviar(key.key)
  }

  return (
    <div id='form'>
      <Form.Item label='Departamento' name='departamento' initialValue={departamento}>
        <label></label>
        <Select onSelect={handleChange} placeholder={departamento} defaultValue={departamento} getPopupContainer={() => document.getElementById('form')} notFoundContent={<Spin tip='Loading....' size='middle'></Spin>}>
          {departamentos.map(elemento1 => (
            <Select.Option key={elemento1.id} value={elemento1.departamento} >{elemento1.departamento} </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Provincia' name='provincia' initialValue={provincia}>
        <label></label>
        <Select onSelect={handleChange1} placeholder={provincia} defaultValue={provincia} getPopupContainer={() => document.getElementById('form')} notFoundContent={<Spin tip='Loading....' size='middle'></Spin>}>
          {provincias.map(elemento2 => (
            <Select.Option key={elemento2.id} value={elemento2.provincia} >{elemento2.provincia} </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Distrito' name='distrito' initialValue={distrito}>
        <label></label>
        <Select width={450} onSelect={handleChange2} placeholder={distrito} defaultValue={distrito} getPopupContainer={() => document.getElementById('form')} notFoundContent={<Spin tip='Loading....' size='middle'></Spin>}>
          {distritos.map(elemento3 => (
            <Select.Option key={elemento3.id} value={elemento3.distrito} >{elemento3.distrito} </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  )
}

DrawerInspector.propTypes = {
  departamento: PropTypes.string,
  provincia: PropTypes.string,
  distrito: PropTypes.string,
  onEnviar: PropTypes.string,
  onProvincia: PropTypes.string,
  onDistrito: PropTypes.string,
  onDepartamento: PropTypes.string,
}

export default DrawerInspector
