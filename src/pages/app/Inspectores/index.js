import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col, Divider, Button, Input, Table } from 'antd'
import { FileExcelFilled } from '@ant-design/icons'

import { columns } from './Columns'
import { list as ListInspectores } from '../../../Actions/Inspector/list'
import ModalCreate from './Modals/ModalCreate'
import { url } from '../../../config/Url'

const { Search } = Input

const PageInspectores = ({ match }) => {
  
  const Inspectores = useSelector((store) => store.Inspectores.list)
  const dispatch = useDispatch()
  const [SearchValue, setSearchValue] = useState('')

  useEffect(() => {
    return () => {
      /* CleanUP */
    }
  }, [])

  useEffect(() => {
    //dispatch(ListInspectores(url + '/inspector/', { current: 1, pageSize: 15 }))
    dispatch(ListInspectores(url + '/inspectores/', { current: 1, pageSize: 15 }))
  }, [])

  const onSearch = (value) => {
    setSearchValue(value)
    if (value.length > 0) {
      //dispatch(ListInspectores(url + `/inspector/?search=${SearchValue}`))
      dispatch(ListInspectores(url + `/inspectores/${SearchValue}`))
    } else {
      //dispatch(ListInspectores(url + '/inspector/'))
      dispatch(ListInspectores(url + '/inspectores/'))
    }
  }

  const onChange = (pagination, filters, sorter) => {
    if (SearchValue === '') {
      //dispatch(ListInspectores(url + '/inspector/',
      dispatch(ListInspectores(url + '/inspectores/',
          {
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters
          }))
    } else {
      //dispatch(ListInspectores(url + `/inspector/?search=${SearchValue}`,
      dispatch(ListInspectores(url + `/inspectores/${SearchValue}`,
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
          //onSearch={onSearch}
          />
        </Row>
      </Col>
    </Row>

    <Divider type="horizontal" dashed={true} orientation="left" > <h4><strong>INSPECTORES</strong></h4> </Divider>

    <Row>
      <Col flex="24">
        <Table
          columns={columns}
          dataSource={Inspectores.data}
          bordered
          size="middle"
          rowKey= {record => record.id}
          pagination={Inspectores.pagination}
          loading={Inspectores.loading}
          //onChange={onChange}
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
