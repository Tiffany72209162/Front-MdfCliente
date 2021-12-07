import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Col, Row, Card, Divider, Modal, Select, DatePicker, Space, Radio } from 'antd'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'
import { toast } from 'react-toastify'
import { url } from '../../../../config/Url'
import { useDispatch } from 'react-redux'
import { create as createInforme } from '../../../../Actions/Informes/create'
import { updateEstado } from '../../../../Actions/Informes/updateEstado'
toast.configure()
const MySwal = withReactContent(SweetAlert)
const Token = 'token ' + localStorage.getItem('data')
const PageInformes = () => {
  const dispatch = useDispatch()
  const [lista, setLista] = useState({
    listaI: [],
    listaIBackend: [],
    testBuscar: ''
  })
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
    console.log(Token)
    const config = {
      headers: {
        Authorization: Token
      }
    }
    axios.get(url + '/ordendetrabajo/' + orden.id + '/', config).then(response => {
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
        title: error.response.data.mensaje,
        didOpen: async () => {}
      })
    })
  }
  const [form] = Form.useForm()
  const actualizarEstado = () => {
    form
      .validateFields()
      .then((values) => {
        const formVal = {
          ...values,
          estado: 'COMPLETADO'
        }
        form.resetFields()
        dispatch(updateEstado(url + `/ordendetrabajo/${orden.id}/`, formVal))
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }
  const saveInformes = (values) => {
    console.log('Success:', values)
    if (orden.recibidopor != null && orden.tipodocumento != null && orden.nrodocumento != null && orden.parentesco != null && orden.entregabajopuerta != null && orden.cargofirmado != null && orden.nrodesuministro != null && orden.puertaalacalle != null && orden.entregaexitosa != null) {
      form.validateFields()
        .then(values => {
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
          dispatch(createInforme(url + '/informe/', formVal))
          form.resetFields()
          MySwal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: 'Se guardo correctamente ...',
            didOpen: async () => {}
          })
          actualizarEstado()
          form.resetFields()
          handleCancel()
          window.location.reload(true)
          form.resetFields()
        })
        .catch(FieldsError => {
          /* CAMPOS ERRONEOS */
        })
    } else {
      console.log('ingrese datos')
    }
  }
  const saveInformesdos = async (values) => {
    try {
      console.log('Success:', values)
      if (values) {
        return axios({
          method: 'post',
          url: 'informe/',
          headers: {
            Authorization: 'Token a9f918bd259ffdacd0d1313dd214cc05d348f2b4'
          },
          data: {
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
        })
      }
      saveInformess()
      handleCancel()
    } catch (e) {
      console.log(e)
      if (e.response.status === 400) {
        MySwal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Ingrese Todo los campos ...',
          didOpen: async () => {}
        })
      }
    }
  }
  const { Option } = Select
  const [value, setValue] = useState([])
  const onChangeRadius = e => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  const handleChange = (e) => {
    setOrden({ ...orden, [e.target.name]: e.target.value })
  }
  const handleChangeid = (e) => {
    setOrden({ id: e.target.value })
  }
  const [, forceUpdate] = useState({})
  useEffect(() => {
    forceUpdate({})
  }, [])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const saveInformess = async (values) => {
    console.log('Success:', values)
    if (orden.recibidopor != null & orden.nrodocumento != null) {
      saveInformess()
      handleCancel()
    }
  }
  const handleCancel = (e) => {
    setIsModalVisible(false)
    form.resetFields()
    window.location.reload(true)
  }
  const handleChangeSelect = (event) => {
    setOrden({ ...orden, value: event.target.value })
  }
  const esconder = () => {
    document.getElementById('buscar').style.display = 'none'
    document.getElementById('lista').style.display = 'block'
  }
  const ubc = {
    labelCol: { span: 10 },
    wrapperCol: { span: 10 }
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Registrar un Informe
      </Button>
      <Modal width={1200} title="Registro de un nuevo informe" visible={isModalVisible} onCancel={handleCancel}
      onFinish={saveInformes}
      onFinishFailed={saveInformes}
      footer={[
        <></>
      ]}
    >
    <div id="buscar" className="buscar" >
     <Form id="create-course-form" form={form}>
     <Col span={7} >
     <Input type="number" className="form-control" name="id_orden" id="id" onChange={handleChangeid} value={orden.id}/><br></br><br></br>
     <button id="btn_getOrden" className="ant-btn ant-btn-primary" disabled={!orden.id} onClick={getOrdendos}>Buscar Orden</button>
     </Col></Form></div>
     <div id="lista" className="lista" style={{ display: 'none' }} >
               {/* ASIGNACION */}
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
    >
    <Row justify='space-around' >
    <Col span={9}>
      <Form.Item name='serviciosolicitado' label='Tipo de Servicio:' {...ubc} >
             <label style={{ display: 'none' }} htmlFor="feFirstName">Tipo de Servicio</label>
                 <Select disabled
                   className="form-group mx-sm-3 mb-2"
                   name="serviciosolicitado"
                   value={orden.serviciosolicitado}
                 >
                   <option value="M1">M1</option>
                   <option value="M2">M2</option>
                   <option value="M3">M3</option>
                 </Select>
                 </Form.Item>

                 <Form.Item name='confechalimite' label='Con fecha Limite:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feLastName">Con fecha Limite</label>
                 <Input type="text" disabled placeholder="N° de siniestro" name="confechalimite" value={orden.confechalimite} className="form-control"/>
                 </Form.Item>
                 <Form.Item name='confechalimite' label='N° de siniestro:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="inputState">N° de siniestro:</label>
                 <Input type="text" disabled placeholder="N° de siniestro" name="nrodesiniestro" value={orden.nrodesiniestro} className="form-control" onChange={handleChange}
                 /></Form.Item>
               <Form.Item name='poliza' label='Poliza:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Poliza</label>
                 <Input
                   type="text" disabled
                   placeholder="poliza"
                   name="poliza"
                   value={orden.poliza}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
      </Col>
      <Col span={9}>
               <Form.Item name='quienencarga' label='Quien encarga:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feLastName">Quien encarga</label>
                 <Input type="text"
                   placeholder="quienencarga" disabled
                   name="quienencarga"
                   value={orden.quienencarga}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               <Form.Item name='datetime' label='Fecha y Hora de encargo:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="inputState">Fecha y</label>
                 <Input
                   type="datetime"
                   placeholder="fechayhoraencargo" disabled
                   name="fechayhoraencargo"
                   value={moment(orden.fechayhoraencargo).format('DD/MM/YYYY  hh:mm A')}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
                 <Form.Item name='ramos' label='Ramo:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feAddress">Ramo</label>
                 <Input
                   placeholder="ramo" disabled
                   name="ramo"
                   value={orden.ramo}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
                 <Form.Item name='placa' label='Placa:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Placa</label>
                 <Input
                   placeholder="placa" disabled
                   name="placa"
                   value={orden.placa}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
      </Col>
      </Row>
      </Form>
      <Form
      name="basic"
      labelCol={{
        span: 11
      }}
      wrapperCol={{
        span: 25
      }}
      initialValues={{
        remember: true
      }}
    >
    <Row gutter={18}>
      <Col span={9}>
        <Space bordered={false}>
    <Form.Item name='motivodeenvio' label='Motivo de envio:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Motivo de envio:</label>
                 <Input disabled style={{ width: 600 }}
                   placeholder="motivodeenvio"
                   name="motivodeenvio"
                   value={orden.motivodeenvio}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
                 </Space>
               </Col>
             </Row>
      </Form>
      <Form
      name="basic"
      labelCol={{
        span: 9
      }}
      wrapperCol={{
        span: 20
      }}
      initialValues={{
        remember: true
      }}
    ><br/>
    <div className="site-card-wrapper">
      <Row gutter={18}>
        <Col span={9}>
          <Space bordered={false}>
      <Form.Item name='calle' label='Calle:' {...ubc}>
    <label style={{ display: 'none' }} htmlFor="feEmail">Calle:</label>
    <Input style={{ width: 600 }} disabled
      placeholder="calle"
      name="calle"
      value={orden.calle}
      className="form-control"
      onChange={handleChange}
    /></Form.Item>
          </Space>
        </Col>
      </Row>
    </div>
    <Row justify='space-around' gutter={18}>
    <Space>
    <Col span={25}>
             <Form.Item name='distrito' label='Distrito:'>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Distrito:</label>
                 <Input
                   placeholder="distrito" disabled
                   name="distrito"
                   value={orden.distrito}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
      </Col>
      <Col span={27}>
      <Form.Item name='provincia' label='Provincia:'>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Provincia</label>
                 <Input
                   placeholder="provincia" disabled
                   name="provincia"
                   value={orden.provincia}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
      </Col>
      <Col span={34}>
      <Form.Item name='departamento' label='Departamento:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Departamento:</label>
                 <Input
                   placeholder="departamento" disabled
                   name="departamento"
                   value={orden.departamento}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
      </Col>
      </Space>
      </Row>
      </Form>

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
      <Form.Item {...ubc}
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

      <Form.Item {...ubc}
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
      <Col span={9}>
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
      <div style={{ position: 'relative', top: '40px', left: '300px' }}>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Button className="ant-btn ant-btn-round" onClick={handleCancel} htmlType="submit">
        Cancelar
        </Button>
        <Button className="ant-btn ant-btn-primary ant-btn-round" type="primary" htmlType="submit">
        Guardar
        </Button>
      </Form.Item>
          </div>
      </Form>
          </div>
          </Modal>

   </>
  )
}

export default PageInformes
