import React from 'react'
import { Space, Tag } from 'antd'
import ModalEdit from './Modals/ModalEdit'

export const columns = [
  {
    title: 'N°',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'ascend',
    width: 20,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres',
    width: 80,
    sorter: (a, b) => a.nombres.length - b.nombres.length
  },
  {
    title: 'Apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
    width: 80,
    sorter: (a, b) => a.apellidos.length - b.apellidos.length
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 80,
    sorter: (a, b) => a.correo.length - b.correo.length
  },
  {
    title: 'Empresa',
    dataIndex: 'nombre_compania',
    key: 'nombre_compania',
    width: 80
  },
  {
    title: 'Departamento',
    dataIndex: 'area_departamento',
    key: 'area_departamento',
    width: 80
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    width: 50,    
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
    title: 'Actions',
    dataIndex: 'id',
    key: 'actions',
    width: 50,
    fixed: 'right',
    render: (id) => {
      return (
        <>
        <Space size='large' >
          <ModalEdit visible={false} idCliente={id} />
        </Space>
        </>
      )
    }
  }
]