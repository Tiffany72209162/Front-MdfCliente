import React from 'react'
import { Space, Tag } from 'antd'
import ModalEditarOrdenT from './Modals/ModalEditarOrdenT'

export const Columns = [
  {
    title: 'N°',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'ascend',
    width: 40,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Placa',
    dataIndex: 'placa',
    key: 'placa',
    width: 150
  },
  {
    title: 'Poliza',
    dataIndex: 'poliza',
    key: 'poliza',
    width: 150
  },
  {
    title: 'Tipo de Trabajo',
    dataIndex: 'tipodetrabajo',
    key: 'tipodetrabajo',
    width: 150
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    width: 80,
    render: (text) => {
      let res
      switch (text) {
        case 'NUEVO':
          res = (
            <Tag color='lime' key={text}>
              NUEVO
            </Tag>
          )
          break
        case 'ASIGNADO':
          res = (
            <Tag color='green' key={text}>
              ASIGNADO
            </Tag>
          )
          break
        case 'COMPLETADO':
          res = (
            <Tag color='blue' key={text}>
              COMPLETADO
            </Tag>
          )
          break
        case 'TERMINADO':
          res = (
            <Tag color='geekblue' key={text}>
              TERMINADO
            </Tag>
          )
          break
      }
      return <>{res}</>
    }
  },
  {
    title: 'Tipo de Servicio',
    dataIndex: 'serviciosolicitado',
    key: 'serviciosolicitado',
    width: 150,
    render: (text) => {
      let res
      switch (text) {
        case 'M1':
          res = <>EXPRESS</>
          break
        case 'M2':
          res = <>24 HORAS</>
          break
        case 'M3':
          res = <>48 HORAS</>
          break
      }
      return <>{res}</>
    }
  },
  {
    title: 'Servicio / Ubicacion',
    dataIndex: 'tipodeservicioporubicacion',
    key: 'tipodeservicioporubicacion',
    width: 150
  },
  {
    title: 'Fecha / Hora',
    dataIndex: 'fechayhoraencargo',
    key: 'fechayhoraencargo',
    width: 180,
    render: (text) => {
      const fecha = (
        <Tag color='green' key='fecha'>
          {text.match(/\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])*/g)}
        </Tag>
      )
      const hora = (
        <Tag color='orange' key='hora'>
          {text.match(/[^T]([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/g)}
        </Tag>
      )
      return (
        <>
          {fecha} {hora}
        </>
      )
    }
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
        <ModalEditarOrdenT visible={false} idOrden={id}/>
      </Space>
      </>
      )
    }
  }
]
