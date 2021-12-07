import React from 'react'
import { Space, Tag } from 'antd'
import moment from 'moment'
import ModalEdit from './Modals/ModalEdit'
import ModalPDF from './Modals/ModalPDF'

export const Columns = [
  {
    title: 'Cod. Orden',
    dataIndex: 'orden',
    key: 'orden',
    defaultSortOrder: 'ascend',
    width: 40,
    sorter: (a, b) => a.orden.id - b.orden.id,
    render: (orden) => `${orden.id}`
  },
  {
    title: 'Placa',
    dataIndex: 'orden',
    key: 'orden',
    sorter: (a, b) => (a.orden.placa > b.orden.placa ? 1 : -1),
    render: (orden) => `${orden.placa}`,
    width: 150
  },
  {
    title: 'Tipo de Servicio',
    dataIndex: 'orden',
    key: 'orden',
    sorter: (a, b) => (a.orden.serviciosolicitado > b.orden.serviciosolicitado ? 1 : -1),
    render: (orden) => `${orden.serviciosolicitado}`,
    width: 150
  },
  {
    title: 'Nombre Asegurado',
    dataIndex: 'orden',
    key: 'orden',
    sorter: (a, b) => (a.orden.destinatario > b.orden.destinatario ? 1 : -1),
    render: (orden) => `${orden.destinatario}`,
    width: 150
  },
  {
    title: 'Estado',
    dataIndex: 'orden',
    key: 'orden',
    sorter: (a, b) => (a.orden.estado > b.orden.estado ? 1 : -1),
    render: (orden) => `${orden.estado}`,
    width: 80
  },
  {
    title: 'Fecha / Hora',
    dataIndex: 'orden',
    key: 'orden',
    sorter: (a, b) => (a.orden.fechayhoraencargo > b.orden.fechayhoraencargo ? 1 : -1),
    render: (orden) => `${moment(orden.fechayhoraencargo).format('DD/MM/YYYY H:mm a')}`,
    width: 180
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'actions',
    width: 100,
    fixed: 'right',
    render: (id) => {
      return (
      <>
      <Space size='large' >
        <ModalEdit idInforme={id}/>
      </Space>
      <Space size='large' >
        <ModalPDF idInforme={id}/>
      </Space>
      </>
      )
    }
  }
]
