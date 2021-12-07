import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update as updateOrden } from '../../../../Actions/Ordenes/update'
import { Button, Modal, Form, Select, Input, InputNumber, DatePicker, Row, Col, Divider, Popover, Alert } from 'antd'
import DrawerInspector from './SelectInspector/Drawer'
import PropTypes from 'prop-types'
import { url } from '../../../../config/Url'
import axios from 'axios'
import { toast } from 'react-toastify'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
toast.configure()
const MySwal = withReactContent(SweetAlert)
const Token = 'token ' + localStorage.getItem('data')

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

const ModalEditarOrdenT = ({ visible, updateTable, idOrden }) => {
  /* Main */
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(visible)
  const [DataIns, setDataIns] = useState([])
  const [alert, Setalert] = useState(false)
  const [orden, setOrden] = useState('')
  const [info, setInfo] = useState('')
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
  const getOrdenId = (numero) => {
    axios.get(url + `/ordendetrabajo/${numero}/`, {
      headers: {
        Authorization: Token // AppSessions.GetSessions()
      }
    })
      .then(response => {
        setOrden(response.data)
        setInfo(response.data)
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getOrdenId(idOrden)
    setDataIns([])
  }, [])
  const onEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const formVal = {
          ...values,
          calle: orden.calle,
          confechalimite: orden.confechalimite,
          destinatario: orden.destinatario,
          estado: orden.estado,
          motivodeenvio: orden.motivodeenvio,
          nrodesiniestro: orden.nrodesiniestro,
          placa: orden.placa,
          poliza: orden.poliza,
          ramo: orden.ramo,
          quienencarga: orden.quienencarga,
          referencia: orden.referencia,
          serviciosolicitado: orden.serviciosolicitado,
          tipodeservicioporubicacion: orden.tipodeservicioporubicacion,
          tipodetrabajo: orden.tipodetrabajo,
          inspector: DataIns[0].id,
          celular: orden.celular,
          fechayhoraencargo: orden.fechayhoraencargo,
          departamento: DataIns[0].ubigeo.departamento,
          provincia: DataIns[0].ubigeo.provincia,
          distrito: DataIns[0].ubigeo.distrito
        }
        form.resetFields()
        dispatch(updateOrden(url + `/ordendetrabajo/${idOrden}/`, formVal))
        MySwal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Se actualizo correctamente...',
          didOpen: async () => {}
        })
        setVisible(!Visible)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
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
  const handleChange = (e) => {
    setOrden({ ...orden, [e.target.name]: e.target.value })
  }
  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`)
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
      <Button type='primary' size='large' shape='round' onClick={OnVisibleModal} >Editar</Button>
      <Modal
      title='Orden de trabajo'
      centered
      maskClosable={false}
      visible={Visible}
      onOk={onEdit}
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
        <Form.Item label="Tipo de Documento" name="confechalimite"><label></label>
        <select style={{ width: 180, borderRadius: '2px', padding: '6px 9px' }}
               className="form-control"
               name="confechalimite"
               value={orden.confechalimite}
               onChange={handleChange}>
               <option value="SI">SI</option>
               <option value="NO">NO</option>
             </select></Form.Item>
        <Form.Item name='quienencarga' label='Cliente' {...ubc} ><label></label>
          <Input name='quienencarga' value={orden.quienencarga} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label='Inspector' {...ubc} ><label></label>
        {DataIns.length > 0 ? <InspectorInfo/> : <CardInsSelect refpop={AsignacionRef} /> }
        </Form.Item>
        </div>
        {/* ----- */}
        </Col>

        <Col>
        {/* ORDEN DE TRABAJO A GENERAR */}
        <div ref={OrdenRef} >
        <Form.Item name='estado' label='Estado'><label></label>
          <select style={{ width: 180, borderRadius: '2px', padding: '6px 9px' }}
               className="form-control"
               name="estado"
               value={orden.estado}
               onChange={handleChange}>
            <option value='NUEVO' key='0' >NUEVO</option>
            <option value='ASIGNADO' key='1' >ASIGNADO</option>
            <option value='COMPLETADO' key='2' >COMPLETADO</option>
            <option value='TERMINADO' key='3' >TERMINADO</option>
          </select>
        </Form.Item>
        <Form.Item name='tipodetrabajo' label='Tipo de Trabajo'><label></label>
        <select style={{ width: 180, borderRadius: '2px', padding: '6px 9px' }}
               className="form-control"
               name="tipodetrabajo"
               value={orden.tipodetrabajo}
               onChange={handleChange}>
            <option value='MENSAJERIA' key='0' >MENSAJERIA</option>
            <option value='NOTIFICACION' key='1' >NOTIFICACION</option>
          </select>
        </Form.Item>
        <Form.Item name='serviciosolicitado' label='Tipo de Servicio'><label></label>
        <select style={{ width: 180, borderRadius: '2px', padding: '6px 9px' }}
               className="form-control"
               name="serviciosolicitado"
               value={orden.serviciosolicitado}
               onChange={handleChange}>
            <option value='M1' key='0' >EXPRESS</option>
            <option value='M2' key='1' >24 HORAS</option>
            <option value='M3' key='2' >48 HORAS</option>
          </select>
        </Form.Item>
        <Form.Item name='tipodeservicioporubicacion' label='Servicio / Ubicación' wrapperCol={{ span: 16 }} ><label></label>
          <select style={{ width: 180, borderRadius: '2px', padding: '6px 9px' }}
               className="form-control"
               name="tipodeservicioporubicacion"
               value={orden.tipodeservicioporubicacion}
               onChange={handleChange}>
                 <option value='URBANA' key='0' >PROVINCIA URBANA</option>
            <option value='PERIFERICA' key='1' >PROVINCIA PERIFERICA</option>
          </select>
        </Form.Item>
        <Form.Item name='fechayhoraencargo' label='fecha de encargo' wrapperCol={{ span: 16 }}><label></label>
    <Input type="datetime-local" style={{ width: 190 }}
               name="fechayhoraencargo"
               value={orden.fechayhoraencargo} onChange={handleChange} />
        </Form.Item>
        </div>
        {/* ----- */}
        </Col>

        </Row>

        <Divider type='horizontal'orientation='left' dashed style={{ marginTop: '0px' }} ><strong>Datos de Asegurado</strong></Divider>
        <Row justify='space-around' >

        <Col span={7} >
        {/* ASEGURADO  - VEHICULO */}
        <Form.Item name='nrodesiniestro' label='N° de Siniestro'><label></label>
          <InputNumber min={0} style={{ width: '100%' }} name='nrodesiniestro' value={orden.nrodesiniestro} onChange={handleChange}/>
        </Form.Item>
        <Form.Item name='placa' label='Placa'><label></label>
            <Input name='placa' value={orden.placa} onChange={handleChange}/>
        </Form.Item>
        <Form.Item name='poliza' label='N° de Poliza'><label></label>
            <Input name='poliza' value={orden.poliza} onChange={handleChange}/>
        </Form.Item>
        <Form.Item name='ramo' label='Ramo'><label></label>
            <Input name='ramo' value={orden.ramo} onChange={handleChange}/>
        </Form.Item>

        {/* ----- */}
        </Col>

        <Col span={7} >
        {/* ASEGURADO - INFO */}

        <Form.Item name='destinatario' label='Destinatario' {...ubc} ><label></label>
            <Input name='destinatario' value={orden.destinatario} onChange={handleChange}/>
        </Form.Item>
        <Form.Item name='celular' label='N° de Celular' {...ubc} ><label></label>
            <Input name='celular' value={orden.celular} onChange={handleChange}/>
        </Form.Item>
        <Form.Item name='motivodeenvio' label='Motivo de Envio' {...ubc} ><label></label>
            <Input.TextArea name='motivodeenvio' rows={4} value={orden.motivodeenvio} onChange={handleChange}/>
        </Form.Item>

        {/* ------ */}
        </Col>

        <Col span={10} >
        {/* ASEGURADO - UBICACION */}
        <div ref={AseguradoRef}>
        <Form.Item label='Ubicacion' {...ubc}><label></label>
          {DataIns.length > 0 ? <strong>{DataIns[0].ubigeo.departamento} / {DataIns[0].ubigeo.provincia} / {DataIns[0].ubigeo.distrito}</strong> : <strong>SIN UBICACION</strong> }
        </Form.Item>
        <Form.Item name='calle' label='Calle' {...ubc}><label></label>
            <Input name='calle' value={orden.calle} onChange={handleChange}/>
        </Form.Item>
        <Form.Item name='referencia' label='Referencia' {...ubc}><label></label>
              <Input.TextArea rows={4} name='referencia' value={orden.referencia} onChange={handleChange}/>
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

ModalEditarOrdenT.propTypes = {
  visible: PropTypes.bool,
  updateTable: PropTypes.func,
  idOrden: PropTypes.number

}

export default ModalEditarOrdenT
