import { Button, Col, Drawer, Input, Row, Table, Cascader } from 'antd'
import React, { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { list as listUbigeo, type as TypeData, current as CurrentValue } from '../../../../../Actions/Ubigeo/list'
import { url } from '../../../../../config/Url'

import { columns } from './Columns'
import PropTypes from 'prop-types'

const DrawerInspector = ({ DataSelect }) => {
  const dispatch = useDispatch()
  const Ubigeo = useSelector(store => store.Ubigeo.list)
  const Inspectores = useSelector(store => store.Inspectores.listEstado)

  const [Options, setOptions] = useState([])
  const [ShowDrawer, setDrawer] = useState(false)
  const [Loading, setLoading] = useState(true)
  const [DataInspector, SetData] = useState([])
  const Ref = useRef(null)

  const [dataIns, setdataIns] = useState([])

  useEffect(() => {
    if (Inspectores.data.length !== 0 && !Inspectores.loading) {
      Inspectores.data.forEach((Inspector, i) => {
        Inspector.key = Inspector.id.toString()
      })
      setdataIns(Inspectores.data)
    }
    switch (Ubigeo.type) {
      case 'Init':
        if (!Ubigeo.loading && Ubigeo.data.length === 0) {
          dispatchList()
        }
        break
      case 'DEPARTAMENTOS':
        if (!Ubigeo.loading && Ubigeo.data.length !== 0) {
          setOptions(getDepartamentos(Ubigeo.data))
          setLoading(true)
        }
        break
      case 'PROVINCIAS':
        if (!Ubigeo.loading && Ubigeo.data.length !== 0) {
          Options.forEach((opt) => {
            if (opt.value === Ubigeo.current.value) {
              opt.loading = false
              opt.children = [...getProvincias(Ubigeo.data)]
            }
          })
          setLoading(true)
          setOptions([...Options])
        }
        break
      case 'DISTRITOS':
        if (!Ubigeo.loading && Ubigeo.data.length !== 0) {
          Options.forEach((opt) => {
            if (opt.value === Ubigeo.current.departamento) {
              opt.children.forEach((opt2) => {
                if (opt2.value === Ubigeo.current.value) {
                  opt2.loading = false
                  opt2.children = [...getDistritos(Ubigeo.data)]
                }
              })
            }
          })
          setLoading(false)
          setOptions([...Options])
        }
        break
    }
  }, [Ubigeo.loading, Inspectores.loading])

  const loadData = (option) => {
    const CurrentOption = option[option.length - 1]

    switch (CurrentOption.categoria) {
      case 'departamento':
        dispatchList('', CurrentOption.value, 0, CurrentOption, 'PROVINCIAS') // obtener provincias
        CurrentOption.loading = Loading
        break
      case 'provincia':
        CurrentOption.departamento = option[0].value
        dispatchList(CurrentOption.value, option[0].value, '', CurrentOption, 'DISTRITOS') // obtener Distritos
        CurrentOption.loading = Loading
        break
    }
  }

  const onChangeUbic = (val) => {
    const response = []
    switch (val.length) {
      case 0:
        setdataIns(Inspectores.data)
        break
      case 3:
        Inspectores.data.forEach((Inspector) => {
          const { ubigeo: { departamento, distrito, provincia } } = Inspector
          if (departamento === val[0] && distrito === val[2] && provincia === val[1]) {
            response.push(Inspector)
          }
        })
        setdataIns(response)
        break
    }
  }

  const dispatchList = (provincia = 0, departamento = '', distrito = 0, data = {}, type = 'DEPARTAMENTOS', id = '') => {
    dispatch(listUbigeo({
      url: url + '/ubigeo/',
      params: {
        id,
        departamento,
        provincia,
        distrito
      }
    }))
    dispatch(TypeData(type))
    dispatch(CurrentValue(data))
  }

  /* getOptions */
  const getDepartamentos = (departamentos) => {
    const options = departamentos.map(({ departamento }) => {
      return ({
        value: departamento,
        label: departamento,
        isLeaf: false,
        categoria: 'departamento'
      })
    })

    return options
  }

  const getProvincias = (provincias) => {
    const children = provincias.map(({ provincia }) => {
      return ({
        value: provincia,
        label: provincia,
        isLeaf: false,
        categoria: 'provincia'
      })
    })

    return children
  }

  const getDistritos = (distritos) => {
    const children = distritos.map(({ distrito }) => {
      return ({
        value: distrito,
        label: distrito,
        categoria: 'distrito'
      })
    })

    return children
  }

  /* ----- */

  /* Onsearch */
  const OnSearch = value => {
    const response = []
    if (value === '') {
      setdataIns(Inspectores.data)
    } else {
      Inspectores.data.forEach((Inspector) => {
        const { nombres } = Inspector
        if (nombres === value) {
          response.push(Inspector)
        }
      })
      setdataIns(response)
    }
  }

  const OnchangeSearch = e => {
    if (e.target.value === '') {
      setdataIns(Inspectores.data)
    }
  }

  /* Select Inspector */

  const SelectIns = () => {
    DataSelect(DataInspector)
    setDrawer(false)
  }

  return (
    <>
      <Button type='primary' size='small' style={{ width: '100%' }} shape='round' onClick={() => setDrawer(true)} >Elegir Inspector</Button>
      <Drawer
        maskClosable={false}
        title='elegir inspector'
        placement='bottom'
        height={450}
        closable={false}
        visible={ShowDrawer}
        onClose={() => setDrawer(false)}>
        <Row gutter={[0, 48]} ref={Ref}>
          <Col span={24}>
            <Row justify='space-between'>
              <Col span={8}>
                <Cascader placeholder='DEPARTAMENTO / PROVINCIA / DISTRITO' options={Options} loadData={loadData} onChange={onChangeUbic} changeOnSelect style={{ width: '100%' }} getPopupContainer={() => Ref.current} />
              </Col>
              <Col span={8}>
                <Input.Search
                  placeholder='buscar por nombre...'
                  allowClear
                  onSearch={OnSearch}
                  onChange={OnchangeSearch}
                  enterButton
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Table
                  size='small'
                  dataSource={dataIns}
                  loading={Inspectores.loading}
                  columns={columns}
                  pagination={{
                    showSizeChanger: false,
                    position: ['none']
                  }}
                  rowSelection={{
                    onChange: (optKey, optData) => SetData([...optData]),
                    type: 'radio'
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row justify='end' gutter={8} >
              <Col>
                <Button type='danger' shape='round'onClick={() => setDrawer(false)} >Cancelar</Button>
              </Col>
              <Col>
                <Button type='primary' shape='round' disabled={false} onClick={SelectIns} >Elegir</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

DrawerInspector.propTypes = {
  DataSelect: PropTypes.func
}

export default DrawerInspector
