import React, { useEffect, useState } from 'react'
import { Row, Col, Divider, Input, Table, Button } from 'antd'
import PropTypes from 'prop-types'
import ModalCreate from './Modals/ModalInformes'
import { Columns } from './Columns'

import { useDispatch, useSelector } from 'react-redux'
import { list as listInformes } from '../../../Actions/Informes/list'
import { list as ListInspectores } from '../../../Actions/Inspector/listEstado'
import { url } from '../../../config/Url'

const PageInformes = ({ match }) => {
  const dispatch = useDispatch()
  const Informes = useSelector((store) => store.Informes.list)

  const [SearchValue, setSearchValue] = useState('')
  useEffect(() => {
    dispatch(listInformes(url + '/informe/', { current: 1, pageSize: 10 }))
  }, [])

  /* Search Informes */
  const onSearch = (value) => {
    setSearchValue(value)
    if (value.length > 0) {
      dispatch(listInformes(url + `/informe/?search=${SearchValue}`))
    } else {
      dispatch(listInformes(url + '/informe/'))
    }
  }
  const OnchageValueSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const onChange = (pagination, filters, sorter) => {
    if (SearchValue === '') {
      dispatch(
        listInformes(url + '/informe/',
          {
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters
          }))
    } else {
      dispatch(
        listInformes(url + `/informe/?search=${SearchValue}`,
          {
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters
          }))
    }
  }
  return (
    <>
    <div>
    <div>
      <Row justify='space-between' style={{ padding: '0 1% 1% 1%' }}>
      <Col>
          <Row gutter={8} align='middle'>
            <Col>
              <ModalCreate visible={false} />
            </Col>
          </Row>
        </Col>
        <Col span={9}>
          <Row align='middle'>
            <Input.Search
              enterButton
              placeholder='Buscar Orden de trabajo...'
              size='large'
              onSearch={onSearch}
              onChange={OnchageValueSearch}
            />
          </Row>
        </Col>
      </Row>

      <Divider type='horizontal' dashed={true} orientation='left'>
        <h4>
          <strong>INFORMES DE TRABAJO</strong>
        </h4>
      </Divider>

      <Row justify='center'>
        <Col span={24}>
          <Table
            columns={Columns}
            dataSource={Informes.data}
            pagination={Informes.pagination}
            loading={Informes.loading}
            onChange={onChange}
            rowKey={(record) => record.id}
          />
        </Col>
      </Row>
      </div>
      </div>
    </>
  )
}

PageInformes.propTypes = {
  match: PropTypes.object
}

export default PageInformes
