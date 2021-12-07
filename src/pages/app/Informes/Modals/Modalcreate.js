import React, { useState, useEffect } from 'react'
import { EditFilled } from '@ant-design/icons'
import { Form, Input, Button, Col, Row, Card, Divider, Modal, Select, DatePicker, Space, Radio } from 'antd'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash'
import Pdf from 'react-to-pdf'
import { url } from '../../../../config/Url'
import moment from 'moment'
import { toast } from 'react-toastify'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import { create as createInforme } from '../../../../Actions/Informes/create'
toast.configure()
const MySwal = withReactContent(SweetAlert)

const ref = React.createRef()

PageInformes.propTypes = {
  visible: PropTypes.bool,
  idInforme: PropTypes.number
}

function PageInformes ({ visible }) {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(visible)
  const [form] = Form.useForm()
  const [info, setInfo] = useState('')
  const [orden, setOrden] = useState({
    id: '',
    checked: false,
    serviciosolicitado: '',
    confechalimite: '',
    fechayhoraencargo: '',
    quienencarga: '',
    nrodesiniestro: '',
    poliza: '',
    ramo: '',
    placa: '',
    motivodeenvio: '',
    calle: '',
    referencia: '',
    distrito: '',
    provincia: '',
    departamento: '',
    destinatario: '',
    celular: '',
    estado: '',
    tipodetrabajo: '',
    tipodeservicioporubicacion: '',
    fechacreacion: '',
    fechamodificacion: '',
    inspector: '',
    recibidopor: '',
    tipodocumento: '',
    nrodocumento: '',
    parentesco: '',
    entregabajopuerta: '',
    cargofirmado: '',
    nrodesuministro: '',
    puertaalacalle: '',
    entregaexitosa: '',
    zonaroja: '',
    fechayhoraentrega: '',
    imagen: null,
    image_height: 100,
    image_width: 100,
    orden: ''
  })
  const getOrdendos = () => {
    const config = {
      headers: {
        Authorization: 'Token a9f918bd259ffdacd0d1313dd214cc05d348f2b4'
      }
    }
    axios.get(url + 'ordendetrabajo/' + orden.id + '/', config).then(response => {
      if (response.data.estado !== 'COMPLETADO') {
        setOrden({
          ...orden,
          serviciosolicitado: response.data.serviciosolicitado,
          confechalimite: response.data.confechalimite,
          fechayhoraencargo: response.data.fechayhoraencargo,
          quienencarga: response.data.quienencarga,
          nrodesiniestro: response.data.nrodesiniestro,
          poliza: response.data.poliza,
          ramo: response.data.ramo,
          placa: response.data.placa,
          motivodeenvio: response.data.motivodeenvio,
          calle: response.data.calle,
          referencia: response.data.referencia,
          distrito: response.data.distrito,
          provincia: response.data.provincia,
          departamento: response.data.departamento,
          destinatario: response.data.destinatario,
          celular: response.data.celular,
          estado: response.data.estado,
          tipodetrabajo: response.data.tipodetrabajo,
          tipodeservicioporubicacion: response.data.tipodeservicioporubicacion,
          fechacreacion: response.data.fechacreacion,
          fechamodificacion: response.data.fechamodificacion,
          inspector: response.data.inspector
        })
        esconder()
        MySwal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Obteniendo datos del Orden...',
          didOpen: async () => {}
        })
      } else {
        MySwal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Orden COMPLETADO...',
          didOpen: async () => {}
        })
      }
    }).catch(error => {
      console.log(error)
      MySwal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: 'orden no existe',
        didOpen: async () => {}
      })
    })
  }
  useEffect(() => {
    if (orden.id === null) {
      console.log('')
    } else {
      getOrdendos()
    }
  }, [])
  const saveInformes = (values) => {
    console.log('Success:', values)
    form
      .validateFields()
      .then((values) => {
        const formVal = {
          ...values,
          recibidopor: orden.recibidopor,
          tipodocumento: orden.tipodocumento,
          nrodocumento: orden.nrodocumento,
          parentesco: orden.parentesco,
          entregabajopuerta: orden.entregabajopuerta,
          cargofirmado: orden.cargofirmado,
          nrodesuministro: orden.nrodesuministro,
          puertaalacalle: orden.puertaalacalle,
          entregaexitosa: orden.entregaexitosa,
          zonaroja: orden.zonaroja,
          fechayhoraentrega: moment(orden.fechayhoraentrega).format('YYYY-MM-DD HH:mm'),
          orden: orden.id
        }
        form.resetFields()
        dispatch(createInforme('/informe/', formVal))
        MySwal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Se Creo correctamente...',
          didOpen: async () => {}
        })
        setVisible(!Visible)
      })
      .catch((orden) => {
        console.log('Validate Failed:', orden)
      })
  }
  const handleChange = (e) => {
    setOrden({ ...orden, [e.target.name]: e.target.value })
  }
  const esconder = () => {
    document.getElementById('buscar').style.display = 'none'
    document.getElementById('lista').style.display = 'block'
  }
  const ubc = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  }
  const handleChangeid = (e) => {
    setOrden({ id: e.target.value })
  }
  return (
    <>
    <Button onClick={() => setVisible(!visible)} type='primary' size='large' shape='circle' icon={<EditFilled />} />
    <Modal
      width={1200}
      visible={Visible}
      title="Nuevo Informe"
      okText="Guardar"
      okButtonProps= {{
        shape: 'round'
      }}
      cancelButtonProps = {{
        shape: 'round'
      }}
      cancelText="Cancelar"
      onOk={saveInformes}
      onCancel={() => setVisible(visible)}
    >
     <div id="buscar" className="buscar" >
     <Form id="create-course-form" form={form}>
     <Col span={7} >
     <Input type="number" className="form-control" name="id_orden" id="id" onChange={handleChangeid} value={orden.id}/><br></br><br></br>
     <button id="btn_getOrden" className="ant-btn ant-btn-primary" disabled={!orden.id} onClick={getOrdendos}>Buscar Orden</button>
     </Col></Form></div>
     <div id="lista" className="lista" style={{ display: 'none' }} >
       <Row justify='space-around' >
           <Col>
           {/* ASIGNACION */}
           <div className="form-group col-md-6">
           <Form.Item name='serviciosolicitado' label='Tipo de Servicio:' {...ubc}>
             <label style={{ display: 'none' }} htmlFor="feFirstName">Tipo de Servicio</label>
                 <Select style={{ width: 200 }}
                   className="form-group mx-sm-3 mb-2"
                   name="serviciosolicitado"
                   value={orden.serviciosolicitado}
                 >
                   <option value="M1">M1</option>
                   <option value="M2">M2</option>
                   <option value="M3">M3</option>
                 </Select>
                 </Form.Item>
               </div>
               <div className="form-group col-md-6">
           <Form.Item name='confechalimite' label='Con fecha Limite:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feLastName">Con fecha Limite</label>
                 <Input
                   type="text"
                   placeholder="N° de siniestro"
                   name="confechalimite"
                   value={orden.confechalimite}
                   className="form-control"
                 /></Form.Item>
               </div>
               <div className="form-group col-md-6">
                 <Form.Item name='confechalimite' label='N° de siniestro:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="inputState">N° de siniestro:</label>
                 <Input style={{ width: 200 }}
                   type="text"
                   placeholder="N° de siniestro"
                   name="nrodesiniestro"
                   value={orden.nrodesiniestro}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
               <div className="form-group col-md-6">
               <Form.Item name='poliza' label='Poliza:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Poliza</label>
                 <Input style={{ width: 200 }}
                   type="text"
                   placeholder="poliza"
                   name="poliza"
                   value={orden.poliza}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
               {/* ----- */}
           </Col>

           <Col>
           {/* ORDEN DE TRABAJO A GENERAR */}
           <div className="form-group col-md-6" style={{ display: 'inline', margin: 0, padding: 20 }}>
               <Form.Item name='quienencarga' label='Quien encarga:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feLastName">Quien encarga</label>
                 <Input type="text"
                   placeholder="quienencarga"
                   name="quienencarga"
                   value={orden.quienencarga}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
               <div className="form-group col-md-6">
               <Form.Item name='datetime' label='Fecha y Hora de encargo:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="inputState">Fecha y</label>
                 <Input
                   type="datetime"
                   placeholder="fechayhoraencargo"
                   name="fechayhoraencargo"
                   value={moment(orden.fechayhoraencargo).format('DD/MM/YYYY  hh:mm A')}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
               <div className="form-group col-md-6">
                 <Form.Item name='ramos' label='Ramo:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feAddress">Ramo</label>
                 <Input
                   placeholder="ramo"
                   name="ramo"
                   value={orden.ramo}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
               <div className="form-group col-md-6">
                 <Form.Item name='placa' label='Placa:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Placa</label>
                 <Input
                   placeholder="placa"
                   name="placa"
                   value={orden.placa}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
           {/* ----- */}
           </Col>

           </Row>
           <div className="form-group col-md-6">
           <Form.Item name='motivodeenvio' label='Motivo de envio:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Motivo de envio:</label>
                 <Input
                   placeholder="motivodeenvio"
                   name="motivodeenvio"
                   value={orden.motivodeenvio}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
               {/* ASIGNACION */}
               <Space direction="vertical">
             <Card title="Direccion" style={{ width: 1050 }}>
<div className="form-row">
               <div className="form-group col-md-6"><Form.Item name='calle' label='Calle:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Calle:</label>
                 <Input
                   placeholder="calle"
                   name="calle"
                   value={orden.calle}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
             </div>
   {/* ----- */}
   <Divider type='horizontal'orientation='left' dashed style={{ marginTop: '0px' }} ></Divider>
           <Row justify='space-around' >
           <Col span={6} >
           {/* ASEGURADO  - VEHICULO */}
           <div className="form-group col-md-6">
             <Form.Item name='distrito' label='Distrito:'>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Distrito:</label>
                 <Input
                   placeholder="distrito"
                   name="distrito"
                   value={orden.distrito}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
           {/* ----- */}
           </Col>

           <Col span={6} >
           {/* ASEGURADO - INFO */}

           <div className="form-group col-md-6">
             <Form.Item name='provincia' label='Provincia:'>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Provincia</label>
                 <Input
                   placeholder="provincia"
                   name="provincia"
                   value={orden.provincia}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>

           {/* ------ */}
           </Col>

           <Col span={6} >
           {/* ASEGURADO - UBICACION */}
           <div className="form-group col-md-6">
           <Form.Item name='departamento' label='Departamento:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Departamento:</label>
                 <Input
                   placeholder="departamento"
                   name="departamento"
                   value={orden.departamento}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               </div>
           {/* ------- */}
           </Col>
           </Row>
           </Card>
           </Space>
         <Form
      name="basic"
      labelCol={{
        span: 11
      }}
      wrapperCol={{
        span: 16
      }}
      initialValues={{
        remember: true
      }}
      onFinish={saveInformes}
      onFinishFailed={saveInformes}
    >
    <Row justify='space-around' >
    <Col span={8}>
      <Form.Item
        label="Recibido por:"
        name="recibidopor"
        rules={[
          {
            required: true,
            message: 'Ingrese  recibidopor!'
          }
        ]}
      >
        <Input className="form-control"
                   placeholder="recibidopor"
                   name="recibidopor"
                   value={orden.recibidopor} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Parentesco:"
        name="parentesco"
        rules={[
          {
            required: true,
            message: 'Ingrese  parentesco!'
          }
        ]}
      >
        <Input className="form-control"
                   placeholder="parentesco"
                   name="parentesco"
                   value={orden.parentesco} onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Entrega bajo puerta:"
        name="entregabajopuerta"
        rules={[
          {
            required: true,
            message: 'Ingrese  entregabajopuerta!'
          }
        ]}
      >
        <Row className="pl-5">
               <Col>
                 <Form.Item name='parentesco' label='.'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="entregabajopuerta"
                   value="true" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   Si
                 </label></Form.Item>
               </Col>
               <Col>
                 <Form.Item name='parentesco' label='.'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="entregabajopuerta"
                   value="false" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   No
                 </label></Form.Item>
               </Col>
             </Row></Form.Item>
      <Form.Item
        label="N° Suministro:"
        name="nrodesuministro"
        rules={[
          {
            required: true,
            message: 'Ingrese  nrodesuministro!'
          }
        ]}
      >
        <Input className="form-control"
                   placeholder="nrodesuministro"
                   name="nrodesuministro"
                   value={orden.nrodesuministro} onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Entrega exitosa:"
        name="entregaexitosa"
        rules={[
          {
            required: true,
            message: 'Ingrese  entregaexitosa!'
          }
        ]}
      >
       <Row className="pl-5">
               <Col>
                 <Form.Item name='parentesco' label='.'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="entregaexitosa"
                   value="true" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   Si
                 </label></Form.Item>
               </Col>
               <Col>
                 <Form.Item name='parentesco' label='.'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="entregaexitosa"
                   value="false" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   No
                 </label></Form.Item>
               </Col>
             </Row>
      </Form.Item>
      <Form.Item
        label="Fecha y hora:"
        name="fechayhoraentrega"
        rules={[
          {
            required: true,
            message: 'Ingrese  fechayhoraentrega!'
          }
        ]}
      >
        <Input type="datetime-local" style={{ width: 200 }}
                   name="fechayhoraentrega"
                   value={orden.fechayhoraentrega} onChange={handleChange} />
      </Form.Item>
      </Col>
      <Col span={7}>
      <Form.Item
        label="Tipo de Documento"
        name="tipodocumento"
        rules={[
          {
            required: true,
            message: 'Ingrese  tipodocumento!'
          }
        ]}
      >
        <select style={{ width: 170, borderRadius: '7px', padding: '6px 11px' }}
                   className="form-control"
                   name="tipodocumento"
                   value={orden.tipodocumento}
                   onChange={handleChange}
                 >
                   <option value="EXT">EXT</option>
                   <option value="DNI">DNI</option>
                 </select>
      </Form.Item>
      <Form.Item
        label="Documento"
        name="nrodocumento"
        rules={[
          {
            required: true,
            message: 'Ingrese  nrodocumento!'
          }
        ]}
      >
        <Input className="form-control"
                   placeholder="nrodocumento"
                   name="nrodocumento"
                   value={orden.nrodocumento} onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Cargo fijo"
        name="cargofirmado"
        rules={[
          {
            required: true,
            message: 'Ingrese  cargofirmado!'
          }
        ]}
      >
        <Row className="pl-5">
             <Form.Item name='cargofirmado' label='.:'>
               <Col>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="cargofirmado"
                   value="true" onChange={handleChange}
                 /><label htmlFor="feEmail">Si</label>
               </Col></Form.Item>
               <Form.Item name='cargofirmado' label='.:' >
               <Col>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="cargofirmado"
                   value="false" onChange={handleChange}
                 /><label htmlFor="feEmail">No</label>
               </Col></Form.Item>
             </Row>
      </Form.Item>
      <Form.Item
        label="¿Puerta a la calle?"
        name="puertaalacalle"
        rules={[
          {
            required: true,
            message: 'Ingrese  puertaalacalle!'
          }
        ]}
      >
        <Row className="pl-5">
               <Col>
               <Form.Item name='puertaalacalle' label='.:'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="puertaalacalle"
                   value="true" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   Si
                 </label></Form.Item>
               </Col>
               <Col>
               <Form.Item name='puertaalacalle' label='.:'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="puertaalacalle"
                   value="false" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   No
                 </label></Form.Item>
               </Col>
             </Row>
      </Form.Item>
      <Form.Item
        label="Zona Roja"
        name="zonaroja"
        rules={[
          {
            required: true,
            message: 'Ingrese  zonaroja!'
          }
        ]}
      >
        <Row className="pl-5">
               <Col>
               <Form.Item name='zonaroja' label='.:'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="zonaroja"
                   value="true" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   Si
                 </label></Form.Item>
               </Col>
               <Col><Form.Item name='zonaroja' label='.:' >
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="zonaroja"
                   value="false" onChange={handleChange}
                 />
                 <label className="form-check-label" htmlFor="inlineRadio1">
                   No
                 </label></Form.Item>
               </Col>
             </Row>
      </Form.Item>
      </Col>
      </Row>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
      </Form.Item>
      </Form>
          </div> </Modal>
    </>
  )
}
export default PageInformes
