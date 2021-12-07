import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create as createOrden } from '../../../../Actions/Ordenes/create'
import { Button, Modal, Form, Select, Input, InputNumber, DatePicker, Row, Col, Divider, Popover, Alert } from 'antd'
import DrawerInspector from './SelectInspector/Drawer'
import PropTypes from 'prop-types'
import { url } from '../../../../config/Url'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify'
toast.configure()
const MySwal = withReactContent(SweetAlert)

/* VALIDATION FORM */
/* templeate validation */
/*  https://github.com/react-component/field-form/blob/master/src/utils/messages.ts */

const ValidateMessages = {
  required: '${label} es requerido'
}

/* rules validation */
/* https://ant.design/components/form/#Rule  */

const RulesItems = {
  default: {
    rules: [{
      required: true
    }]
  },
  array: {
    rules: [{
      type: 'array',
      required: true
    }]
  }
}

const ModalCreate = ({ visible, updateTable }) => {
  /* Main */
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(visible)
  const [DataIns, setDataIns] = useState([])
  const [alert, Setalert] = useState(false)
  const Orden = useSelector((store) => store.Ordenes.create)

  /* Refrencias al DOM */
  const OrdenRef = useRef(null)
  const AsignacionRef = useRef(null)
  const AseguradoRef = useRef(null)
  /* ----  */

  useEffect(() => {
    /*  */
  }, [Orden, Visible])

  /* Hook UseForm
     https://ant.design/components/form/#FormInstance */

  const [form] = Form.useForm()

  const onOk = () => {
    if (DataIns.length > 0) {
      Setalert(false)
      form.validateFields()
        .then(values => {
          const formVal = {
            ...values,
            inspector: DataIns[0].id,
            fechayhoraencargo: values.fechayhoraencargo.format('YYYY-MM-DD HH:mm'),
            departamento: DataIns[0].ubigeo.departamento,
            provincia: DataIns[0].ubigeo.provincia,
            distrito: DataIns[0].ubigeo.distrito
          }
          dispatch(createOrden(url + '/ordendetrabajo/', formVal))
          setDataIns([])
          MySwal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: 'Se guardo correctamente...',
            didOpen: async () => {}
          })
          form.resetFields()
          updateTable(true)
          setVisible(!Visible)
        })
        .catch(FieldsError => {
          /* CAMPOS ERRONEOS */
        })
    } else {
      Setalert(true)
    }
  }

  const onCancelModal = () => {
    setDataIns([])
    setVisible(!Visible)
    Setalert(false)
  }

  /* Layouts Forms */
  const ubc = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  }

  /* MODAL */

  const OnVisibleModal = () => {
    setVisible(!Visible)
    form.resetFields()
  }

  /* OnselectRow */

  const DataSelect = (dataUser) => {
    setDataIns([...dataUser])
  }

  /* COMPONENTE DATA INSPECTOR */
  const InspectorInfo = () => {
    return (
      <div>
        <h4 style={{ fontWeight: 'bold' }}>Nombres y Apellidos: </h4>
        <p>{DataIns[0].nombres} {DataIns[0].apellidos}</p>
        <h4 style={{ fontWeight: 'bold' }}>DNI: </h4>
        <p>{DataIns[0].nrodocumento}</p>
        <div style={{ marginTop: '10%' }} >
          <DrawerInspector DataSelect={DataSelect} />
        </div>
      </div>
    )
  }

  const CardInsSelect = ({ refpop }) => {
    return (
      <Popover
        content={<Alert message="Inspector no Seleccionado" type="warning" showIcon />}
        visible={alert}
        placement='right'
        getPopupContainer={() => refpop.current }
      >
        <DrawerInspector DataSelect={DataSelect} />
      </Popover>
    )
  }

  CardInsSelect.propTypes = {
    refpop: PropTypes.object
  }
  /* COMPONENTE */
  return (
    <>
      <Button type='primary' size='large' shape='round' onClick={OnVisibleModal} >Nuevo</Button>
      <Modal
      title='Orden de trabajo'
      centered
      maskClosable={false}
      visible={Visible}
      onOk={onOk}
      onCancel={onCancelModal}
      width={1200}
      >
        <Form
        form={form}
        name='createOrden'
        validateMessages={ValidateMessages}
        labelAlign='right'
        wrapperCol= {{
          span: 12
        }}
        labelCol= {{
          span: 10
        }}
        initialValues = {{
          tipodetrabajo: 'MENSAJERIA',
          serviciosolicitado: 'M1',
          tipodeservicioporubicacion: 'URBANA',
          estado: 'NUEVO',
          confechalimite: 'SI'
        }}
        >
          <Divider type='horizontal'orientation='left' dashed style={{ marginTop: '0px' }} ><strong>Asignacion de Orden</strong></Divider>
            <Row justify='space-around' >

            <Col>
            {/* ASIGNACION */}
            <div ref={AsignacionRef} >
            <Form.Item name='confechalimite' label='fecha Limite' {...RulesItems.default} {...ubc} >
              <Select getPopupContainer = {() => AsignacionRef.current} virtual={false} >
                <Select.Option value='SI' key='0' >SI</Select.Option>
                <Select.Option value='NO' key='1' >NO</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='quienencarga' label='Cliente' {...RulesItems.default} {...ubc} >
              <Input/>
            </Form.Item>
            <Form.Item label='Inspector' {...RulesItems.default} {...ubc} >
            {DataIns.length > 0 ? <InspectorInfo/> : <CardInsSelect refpop={AsignacionRef} /> }
            </Form.Item>
            </div>
            {/* ----- */}
            </Col>

            <Col>
            {/* ORDEN DE TRABAJO A GENERAR */}
            <div ref={OrdenRef} >
            <Form.Item name='estado' label='Estado' {...RulesItems.default} >
              <Select getPopupContainer = {() => OrdenRef.current} virtual={false} >
                <Select.Option value='NUEVO' key='0' >NUEVO</Select.Option>
                <Select.Option value='ASIGNADO' key='1' >ASIGNADO</Select.Option>
                <Select.Option value='COMPLETADO' key='2' >COMPLETADO</Select.Option>
                <Select.Option value='TERMINADO' key='3' >TERMINADO</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='tipodetrabajo' label='Tipo de Trabajo' {...RulesItems.default} >
              <Select getPopupContainer = {() => OrdenRef.current} virtual={false} >
                <Select.Option value='MENSAJERIA' key='0' >MENSAJERIA</Select.Option>
                <Select.Option value='NOTIFICACION' key='1' >NOTIFICACION</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='serviciosolicitado' label='Tipo de Servicio' {...RulesItems.default} >
              <Select getPopupContainer = {() => OrdenRef.current} virtual={false} >
                <Select.Option value='M1' key='0' >EXPRESS</Select.Option>
                <Select.Option value='M2' key='1' >24 HORAS</Select.Option>
                <Select.Option value='M3' key='2' >48 HORAS</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='tipodeservicioporubicacion' label='Servicio / Ubicación'{...RulesItems.default} wrapperCol={{ span: 16 }} >
              <Select getPopupContainer = {() => OrdenRef.current} virtual={false} >
                <Select.Option value='URBANA' key='0' >PROVINCIA URBANA</Select.Option>
                <Select.Option value='PERIFERICA' key='1' >PROVINCIA PERIFERICA</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='fechayhoraencargo' label='fecha de encargo' {...RulesItems.default} wrapperCol={{ span: 16 }} >
              <DatePicker showTime placeholder={'Fecha de Encargo'} format='DD/MM/YYYY HH:mm' getPopupContainer = {() => OrdenRef.current} />
            </Form.Item>
            </div>
            {/* ----- */}
            </Col>

            </Row>

            <Divider type='horizontal'orientation='left' dashed style={{ marginTop: '0px' }} ><strong>Datos de Asegurado</strong></Divider>
            <Row justify='space-around' >

            <Col span={7} >
            {/* ASEGURADO  - VEHICULO */}
            <Form.Item name='nrodesiniestro' label='N° de Siniestro' {...RulesItems.default} >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name='placa' label='Placa' {...RulesItems.default} >
                <Input />
            </Form.Item>
            <Form.Item name='poliza' label='N° de Poliza' {...RulesItems.default} >
                <Input />
            </Form.Item>
            <Form.Item name='ramo' label='Ramo'{...RulesItems.default} >
                <Input />
            </Form.Item>

            {/* ----- */}
            </Col>

            <Col span={7} >
            {/* ASEGURADO - INFO */}

            <Form.Item name='destinatario' label='Destinatario' {...RulesItems.default} {...ubc} >
                <Input />
            </Form.Item>
            <Form.Item name='celular' label='N° de Celular' {...RulesItems.default} {...ubc} >
                <Input />
            </Form.Item>
            <Form.Item name='motivodeenvio' label='Motivo de Envio'{...RulesItems.default} {...ubc} >
                <Input.TextArea rows={4} />
            </Form.Item>

            {/* ------ */}
            </Col>

            <Col span={10} >
            {/* ASEGURADO - UBICACION */}
            <div ref={AseguradoRef}>
            <Form.Item label='Ubicacion'{...RulesItems.default} {...ubc}>
              {DataIns.length > 0 ? <strong>{DataIns[0].ubigeo.departamento} / {DataIns[0].ubigeo.provincia} / {DataIns[0].ubigeo.distrito}</strong> : <strong>SIN UBICACION</strong> }
            </Form.Item>
            <Form.Item name='calle' label='Calle'{...RulesItems.default} {...ubc}>
                <Input />
            </Form.Item>
            <Form.Item name='referencia' label='Referencia'{...RulesItems.default} {...ubc}>
                  <Input.TextArea rows={4} />
            </Form.Item>
            </div>
            {/* ------- */}
            </Col>

            </Row>
        </Form>
      </Modal>
      </>

  )
}

ModalCreate.propTypes = {
  visible: PropTypes.bool,
  updateTable: PropTypes.func

}

export default ModalCreate
