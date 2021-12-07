import React, { useState, useEffect } from 'react'
import { EditFilled } from '@ant-design/icons'
import { Form, Input, Button, Col, Row, Card, Divider, Modal, Select, DatePicker, Space, Radio } from 'antd'
import { useDispatch } from 'react-redux'
import { update as updateInforme } from '../../../../Actions/Informes/update'
import PropTypes from 'prop-types'
import axios from 'axios'
import { isUndefined } from 'lodash'
import Pdf from 'react-to-pdf'
import { url } from '../../../../config/Url'
import moment from 'moment'
import { toast } from 'react-toastify'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
toast.configure()
const MySwal = withReactContent(SweetAlert)
const Token = 'token ' + localStorage.getItem('data')

const ref = React.createRef()

ModalEdit.propTypes = {
  visible: PropTypes.bool,
  idInforme: PropTypes.number
}

function ModalEdit ({ visible, idInforme }) {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(visible)
  const [form] = Form.useForm()
  const [orden, setOrden] = useState('')
  const [info, setInfo] = useState('')

  const getInspectorId = (numero) => {
    axios.get(url + `/informe/${numero}/`, {
      headers: {
        Authorization: Token // AppSessions.GetSessions()
      }
    })
      .then(response => {
        setInfo(response.data.orden)
        setOrden(response.data)
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getInspectorId(idInforme)
  }, [])

  const onEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const formVal = {
          ...values,
          recibidopor: orden.recibidopor,
          cargofirmado: orden.cargofirmado,
          entregabajopuerta: orden.entregabajopuerta,
          fechayhoraentrega: orden.fechayhoraentrega,
          nrodesuministro: orden.nrodesuministro,
          nrodocumento: orden.nrodocumento,
          orden: info.id,
          parentesco: orden.parentesco,
          puertaalacalle: orden.puertaalacalle,
          tipodocumento: orden.tipodocumento,
          entregaexitosa: orden.entregaexitosa,
          zonaroja: orden.zonaroja
        }
        form.resetFields()
        dispatch(updateInforme(url + `/informe/${idInforme}/`, formVal))
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
  const handleChange = (e) => {
    setOrden({ ...orden, [e.target.name]: e.target.value })
  }
  const ubc = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  }
  return (
    <>
    <Button onClick={() => setVisible(!visible)} type='primary' size='large' shape='circle' icon={<EditFilled />} />
    <Modal
      width={1200}
      visible={Visible}
      title="Editar Informe"
      okText="Editar"
      okButtonProps= {{
        shape: 'round'
      }}
      cancelButtonProps = {{
        shape: 'round'
      }}
      cancelText="Cancelar"
      onOk={onEdit}
      onCancel={() => setVisible(visible)}
    >
      <div id="lista" className="lista">
      <div className="form-group col-md-6" style={{ display: 'none' }}>
           <Form.Item name='id' label=':' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feLastName"></label>
                 <Input
                   type="text"
                   placeholder="N° de siniestro"
                   name="id"
                   value={info.id}
                   className="form-control" disabled
                 /></Form.Item>
               </div>
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
                   value={info.serviciosolicitado}
                 >
                   <option value="M1">M1</option>
                   <option value="M2">M2</option>
                   <option value="M3">M3</option>
                 </Select>
                 </Form.Item>

                 <Form.Item name='confechalimite' label='Con fecha Limite:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feLastName">Con fecha Limite</label>
                 <Input type="text" disabled placeholder="N° de siniestro" name="confechalimite" value={info.confechalimite} className="form-control"/>
                 </Form.Item>
                 <Form.Item name='confechalimite' label='N° de siniestro:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="inputState">N° de siniestro:</label>
                 <Input type="text" disabled placeholder="N° de siniestro" name="nrodesiniestro" value={info.nrodesiniestro} className="form-control" onChange={handleChange}
                 /></Form.Item>
               <Form.Item name='poliza' label='Poliza:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Poliza</label>
                 <Input
                   type="text" disabled
                   placeholder="poliza"
                   name="poliza"
                   value={info.poliza}
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
                   value={info.quienencarga}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
               <Form.Item name='datetime' label='Fecha y Hora de encargo:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="inputState">Fecha y</label>
                 <Input
                   type="datetime"
                   placeholder="fechayhoraencargo" disabled
                   name="fechayhoraencargo"
                   value={moment(info.fechayhoraencargo).format('DD/MM/YYYY  hh:mm A')}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
                 <Form.Item name='ramos' label='Ramo:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feAddress">Ramo</label>
                 <Input
                   placeholder="ramo" disabled
                   name="ramo"
                   value={info.ramo}
                   className="form-control"
                   onChange={handleChange}
                 /></Form.Item>
                 <Form.Item name='placa' label='Placa:' {...ubc}>
                 <label style={{ display: 'none' }} htmlFor="feEmail">Placa</label>
                 <Input
                   placeholder="placa" disabled
                   name="placa"
                   value={info.placa}
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
      <Col span={25}>
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
    >
    <Row justify='space-around' >
    <Col span={9}>
      <Form.Item {...ubc}
        label="Recibido por:"
        name="recibidopor"
        rules={[
          {
            required: true,
            message: 'Ingrese  recibidopor!'
          }
        ]}
      ><label></label>
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
      ><label></label>
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
      ><label></label>
        <Row className="pl-5">
               <Col>
                 <Form.Item name='parentesco' label='.'>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="entregabajopuerta"
                   value="true" onChange={handleChange}
                   checked={orden.entregabajopuerta === true}
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
                   checked={orden.entregabajopuerta === false}
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
      ><label></label>
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
                 <Form.Item name='parentesco' label='.'><label></label>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="entregaexitosa"
                   value="true" onChange={handleChange}
                   checked={orden.entregaexitosa === true}
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
                   checked={orden.entregaexitosa === false}
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
      ><label></label>
        <Input type="datetime-local" style={{ width: 200 }}
                   name="fechayhoraentrega"
                   value={orden.fechayhoraentrega} onChange={handleChange} />
      </Form.Item>
      </Col>
      <Col span={10}>
      <Form.Item
        label="Tipo de Documento"
        name="tipodocumento"
        rules={[
          {
            required: true,
            message: 'Ingrese  tipodocumento!'
          }
        ]}
      ><label></label>
        <select style={{ width: 160, borderRadius: '2px', padding: '6px 10px' }}
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
      ><label></label>
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
                   checked={orden.cargofirmado === true}
                 /><label htmlFor="feEmail">Si</label>
               </Col></Form.Item>
               <Form.Item name='cargofirmado' label='.:' >
               <Col>
                 <Input
                   className="form-check-input"
                   type="radio"
                   name="cargofirmado"
                   value="false" onChange={handleChange}
                   checked={orden.cargofirmado === false}
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
                   checked={orden.puertaalacalle === true}
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
                   checked={orden.puertaalacalle === false}
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
                   checked={orden.zonaroja === true}
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
                   checked={orden.zonaroja === false}
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
      </Form.Item>
          </div>
      </Form>
          </div>
    </Modal>
    </>
  )
}
export default ModalEdit
