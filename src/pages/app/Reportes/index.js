import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Divider, Button, Input, Table, Space, DatePicker } from 'antd'
import { FileExcelFilled } from '@ant-design/icons'

import { columns } from './Columns'
import { list as ListReportes, REPORTE_LIST_RESET } from '../../../Actions/Reportes/list'
import { times } from 'lodash'
import { url } from '../../../config/Url'

const { Search } = Input
const { RangePicker } = DatePicker

// eslint-disable-next-line react/prop-types
const Reportes = ({ match }) => {
  // console.log(match)
  const Reportes = useSelector((store) => store.Reportes.list)
  const dispatch = useDispatch()
  const [SearchValue, setSearchValue] = useState('')
  const [Fecha, setFecha] = useState(['2021-01-01', '2021-01-01'])

  useEffect(() => {
    return () => {
      /* CleanUP */
    }
  }, [])

  // API WEB URL
  // const url = new URLSearchParams('http://localhost:3000/inspectores')
  // const params = new URLSearchParams(url.search)
  // url.searchParams.set('key', 3)
  // window.location.search = url

  useEffect(() => {
    dispatch(ListReportes(url + `/reporte/?fechacreacion__gt=${Fecha[0]}&fechacreacion__lt=${Fecha[1]}`, { current: 1, pageSize: 10 }))
  }, [Fecha])

  const onSearch = (value) => {
    setSearchValue(value)
    if (value.length > 0) {
      dispatch(ListReportes(url + `/reporte/?search=${SearchValue}`))
    } else {
      dispatch(ListReportes(url + '/reporte/'))
    }
  }
  const cambiarFecha = (value, mode) => {
    console.log(mode)
    setFecha(mode)
  }
  const onChange = (pagination, filters, sorter) => {
    if (SearchValue === '') {
      dispatch(
        ListReportes(url + '/reporte/',
          {
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters
          }))
    } else {
      dispatch(
        ListReportes(url + `/reporte/?search=${SearchValue}`,
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
    <Row justify="space-between" gutter={16} style= { { padding: '0 1% 1% 1%' } } >
      <Col>
        <Row gutter={8} align="middle">
          <Col>
            <Space>
              <RangePicker
              onChange={cambiarFecha}
              label='Ingrese el rango de fecha:'
              />
            </Space>
          </Col>
          <Col>
          </Col>
        </Row>
      </Col>
      <Col >
        <Row gutter={8} align='middle'>
          <Search
          placeholder="Search..."
          allowClear
          enterButton
          size="large"
          onSearch={onSearch}
          />
        </Row>
      </Col>
    </Row>

    <Divider type="horizontal" dashed={true} orientation="left" > <h4><strong>REPORTES</strong></h4> </Divider>

    <Row>
      <Col flex="24">
        <Table
          columns={columns}
          dataSource={Reportes.data}
          bordered
          size="middle"
          /* scroll={{ x: 'calc(700px + 50%)', y: 600 }} */
          rowKey= {record => record.id}
          pagination={Reportes.pagination}
          loading={Reportes.loading}
          onChange={onChange}
        />
      </Col>
    </Row>
    </>
  )
}

export default Reportes
