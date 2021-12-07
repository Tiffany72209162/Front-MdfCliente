import React, { useEffect, useState } from 'react'
import { Row, Col, Divider, Input, Table } from 'antd'

import PropTypes from 'prop-types'

import { Columns } from './Columns'

import { useDispatch, useSelector } from 'react-redux'
import { list as listOrdenes } from '../../../Actions/Ordenes/list'
import { list as ListInspectores } from '../../../Actions/Inspector/listEstado'

import ModalUpload from './Modals/ModalUpload'
import ModalCreate from './Modals/ModalCreate'
import { url } from '../../../config/Url'

const PageOrdenes = ({ match }) => {
  const dispatch = useDispatch()
  const Ordenes = useSelector((store) => store.Ordenes.list)
	useEffect(() => {
		dispatch(ListInspectores(url + '/inspector/?estado=ACT'))
	  }, [])

  const [pagination, setPagination] = useState({
    total: Ordenes.data.count,
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} de ${total} registros`,
    showSizeChanger: false
  })
  const [SearchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (Ordenes.loading === false && Ordenes.data.length === 0) {
      dispatchList()
    }
    if (Ordenes.loading === false && Ordenes.data.length !== 0) {
      setPagination({
        ...pagination,
        total: Ordenes.data.count
      })
    }
  }, [Ordenes.loading])

  /* Search Ordenes */

  const onSearch = (value) => {
    if (SearchValue.length > 0) {
      dispatchList(SearchValue)
      Pagination()
    }
  }

  const OnchageValueSearch = (e) => {
    setSearchValue(e.target.value)
    if (e.target.value === '') {
      dispatchList(null)
      Pagination()
    }
  }
  /* onChangeTable */

  const onChangeTable = (pag, filter, sorter, extra) => {
    switch (extra.action) {
      case 'paginate':
        dispatchList(SearchValue, (pag.current - 1) * 10)
        Pagination(pag.current)
        break
    }
  }

  function dispatchList (search = null, offset = 0, limit = 10) {
    dispatch(listOrdenes({
      url: url + '/ordendetrabajo/',
      params: {
        limit,
        offset,
        search
      }
    }))
  }

  function Pagination (current = 1) {
    setPagination({
      ...pagination,
      current
    })
  }

  return (
    <>
      <Row justify='space-between' style={{ padding: '0 1% 1% 1%' }}>
        <Col>
          <Row gutter={8} align='middle'>
            <Col>
              <ModalUpload visible={false} />
            </Col>
            <Col>
              <ModalCreate visible={false}/>
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
          <strong>ORDENES DE TRABAJO</strong>
        </h4>
      </Divider>

      <Row justify='center'>
        <Col span={24}>
          <Table
            columns={Columns}
            dataSource={Ordenes.data.results}
            loading={Ordenes.loading}
            pagination={pagination}
            size='middle'
            onChange={onChangeTable}
            rowKey={(record) => record.id}
          />
               </Col>
      </Row>
    </>
  )
}

PageOrdenes.propTypes = {
  match: PropTypes.object
}

export default PageOrdenes
