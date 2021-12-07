import React from 'react'
import { Space, Tag } from 'antd'
import ModalDelete from './Modals/ModalDelete'
import ModalEdit from './Modals/ModalEdit'

export const columns = [
  {
    title: 'N°',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'ascend',
    width: 40,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres',
    width: 150
  },
  {
    title: 'Apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
    width: 150
  },
  {
    title: 'DNI',
    dataIndex: 'nrodocumento',
    key: 'documento',
    width: 80
  },
  {
    title: 'celular',
    dataIndex: 'celular1',
    key: 'celular',
    width: 80
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    width: 80,
    filters: [
      {
        text: 'Activos',
        value: true
      },
      {
        text: 'Inactivos',
        value: false
      }
    ],
    onFilter: (value, record) => record.estado.indexOf(value) === 0,
    // eslint-disable-next-line react/display-name
    render: estado => (
      <>
      {
      estado === false ? <Tag color='red' key={estado} >INACTIVO</Tag> : <Tag color='green' key={estado} >ACTIVO</Tag>
      }
      </>
    )
  },
  {
    title: 'Direccion',
    dataIndex: 'direccion',
    key: 'direccion',
    width: 180
  },
  {
    title: 'Provincia / Distrito',
    dataIndex: ['distrito', 'provincia'],
    key: 'distrito',
    width: 180,
    // eslint-disable-next-line react/display-name
    render: (text, record) => <> <Tag color='green'key={record.distrito}>{record.distrito}</Tag> </>
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'actions',
    width: 100,
    fixed: 'right',
    // eslint-disable-next-line react/display-name
    render: (id) => {
      return (
      <>
      <Space size='large' >
        <ModalEdit idInspector={id} />
      </Space>
      </>
      )
    }
  }
]
