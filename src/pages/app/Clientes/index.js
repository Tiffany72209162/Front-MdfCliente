import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col, Divider, Button, Input, Table } from 'antd'

import { columns } from './Columns'
import ModalCreate from './Modals/ModalCreate'

import { list as listClientes } from '../../../Actions/Clientes/list'
import { url } from '../../../config/Url'

const { Search } = Input

const PageClientes = ({match}) => {

  const Clientes = useSelector((store) => store.Clientes.list)
  const dispatch = useDispatch()
  const [SearchValue, setSearchValue] = useState('')

  useEffect(() => {
    return () => {
      /* CleanUP */
    }
  }, [])

  useEffect(() => {
    dispatch(listClientes('https://apimdf.devopsacademy.pe/entidades/clientes/', { current: 1, pageSize: 15 }))
  }, [])

  return (
    <>
      <Row justify="space-between" gutter={16} style= { { padding: '0 1% 1% 1%' } } >
        <Col>
          <Row gutter={8} align="middle">
            <Col>
              <ModalCreate visible={false} />
            </Col>
          </Row>
        </Col>
        <Col >
          <Row gutter={8} align='middle'>
            <Search
              placeholder="Buscar..."
              allowClear
              enterButton
              size="large"
              //onSearch={onSearch}
              />
          </Row>
        </Col>
      </Row>

      <Divider type="horizontal" dashed={true} orientation="left" > <h4><strong>CLIENTES</strong></h4> </Divider>

      <Row>
        <Col flex="24">
          <Table
            columns={columns}
            dataSource={Clientes.data}
            bordered
            size="middle"
            rowKey= {record => record.id}
            pagination={Clientes.pagination}
            loading={Clientes.loading}
            //onChange={onChange}
          />
        </Col>
      </Row> 
 
    </>
  )

}

PageClientes.propTypes = {
  match: PropTypes.object
}

export default PageClientes