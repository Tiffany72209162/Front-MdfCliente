import React from 'react'
import { Space, Tag } from 'antd'

export const columns = [
  {
    title: 'N° de orden',
    dataIndex: 'nroOrdenTrabajo',
    key: 'nroOrdenTrabajo',
    defaultSortOrder: 'ascend',
    width: 40,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Fecha orden de trabajo',
    dataIndex: 'fechaOrdenTrabajo',
    key: 'fechaOrdenTrabajo',
    width: 150
  },
  {
    title: 'Fecha de Solicitud',
    dataIndex: 'fechaSolicitud',
    key: 'fechaSolicitud',
    width: 150
  },
  {
    title: 'Ramo',
    dataIndex: 'ramo',
    key: 'ramo',
    width: 80
  },
  {
    title: 'Placa',
    dataIndex: 'placa',
    key: 'placa',
    width: 80
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    width: 80,
    filters: [
      {
        text: 'Nueva',
        value: 'NUEVA'
      },
      {
        text: 'Asignado',
        value: 'ASIGNADO'
      },
      {
        text: 'Completado',
        value: 'COMPLETADO'
      },
      {
        text: 'Terminado',
        value: 'TERMINADO'
      }
    ],
    onFilter: (value, record) => record.estado.indexOf(value) === 0,
    // eslint-disable-next-line react/display-name
    render: estado => (
      <>
      {
      estado === 'INA' ? <Tag color='red' key={estado} >INACTIVO</Tag> : <Tag color='green' key={estado} >ACTIVO</Tag>
      }
      </>
    )
  },
  {
    title: 'Tipo de Servicio',
    dataIndex: 'tipoDeServicio',
    key: 'tipoDeServicio',
    width: 180
  },
  {
    title: 'Provincia / Distrito',
    dataIndex: ['distrito', 'provincia'],
    key: 'distrito',
    width: 180,
    // eslint-disable-next-line react/display-name
    render: (text, record) => <> <Tag color='green'key={record.distrito}>{record.distrito}</Tag> </>
  }
]
