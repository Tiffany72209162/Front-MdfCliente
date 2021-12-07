import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Divider, Button, Input, Table } from 'antd'
import { FileExcelFilled } from '@ant-design/icons'

import { columnsEstado } from './ColumnsEstado'
import { list as ListInspectores } from '../../../Actions/Inspector/listEstado'
import ModalCreate from './Modals/ModalCreate'
import { url } from '../../../config/Url'

const { Search } = Input

// eslint-disable-next-line react/prop-types
const PageInspectores = ({ match }) => {
  // console.log(match)
  const Inspectores = useSelector((store) => store.Inspectores.list)
  const dispatch = useDispatch()
  const [SearchValue, setSearchValue] = useState('')

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
    dispatch(ListInspectores(url + '/inspector/?estado=ACT', { current: 1, pageSize: 10 }))
  }, [])

  const onSearch = (value) => {
    setSearchValue(value)
    if (value.length > 0) {
      dispatch(ListInspectores(url + `/inspector/?estado=ACT?search=${SearchValue}`))
    } else {
      dispatch(ListInspectores(url + '/inspector/?estado=ACT'))
    }
  }

  const onChange = (pagination, filters, sorter) => {
    if (SearchValue === '') {
      dispatch(
        ListInspectores(url + '/inspector/?estado=ACT',
          {
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters
          }))
    } else {
      dispatch(
        ListInspectores(url + `/inspector/?estado=ACT?search=${SearchValue}`,
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
            <Button type="dashed" icon={<FileExcelFilled />} size="large">excel</Button>
          </Col>
          <Col>
          <ModalCreate visible={false} />
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

    <Divider type="horizontal" dashed={true} orientation="left" > <h4><strong>INSPECTORES</strong></h4> </Divider>

    <Row>
      <Col flex="24">
        <Table
          columns={columnsEstado}
          dataSource={Inspectores.data}
          bordered
          size="middle"
          /* scroll={{ x: 'calc(700px + 50%)', y: 600 }} */
          rowKey= {record => record.id}
          pagination={Inspectores.pagination}
          loading={Inspectores.loading}
          onChange={onChange}
        />
      </Col>
    </Row>
    </>
  )
}

PageInspectores.propTypes = {
  match: PropTypes.object
}

export default PageInspectores
