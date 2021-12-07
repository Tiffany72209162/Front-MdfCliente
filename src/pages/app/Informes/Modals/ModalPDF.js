import React, { useState, useEffect } from 'react'
import { FilePdfOutlined, DownloadOutlined } from '@ant-design/icons'
import { Form, Input, Button, Col, Row, Card, Divider, Modal, Select, DatePicker, Space, Radio, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'
import { update as updateInforme } from '../../../../Actions/Informes/update'
import PropTypes from 'prop-types'
import axios from 'axios'
import { isUndefined } from 'lodash'
import Pdf from 'react-to-pdf'
import moment from 'moment'
import './index.css'
import { url } from '../../../../config/Url'

const ref = React.createRef()
const Token = 'token ' + localStorage.getItem('data')

ModalPDF.propTypes = {
  visible: PropTypes.bool,
  idInforme: PropTypes.number
}

function ModalPDF ({ visible, idInforme }) {
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
        setOrden(response.data)
        setInfo(response.data.orden)
        console.log(response.data.orden)
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getInspectorId(idInforme)
  }, [])
  const handleChange = (e) => {
    setOrden({ ...orden, [e.target.name]: e.target.value })
    setInfo({ ...info, [e.target.name]: e.target.value })
  }
  const ubc = {
    labelCol: { span: 11 },
    wrapperCol: { span: 11 }
  }
  return (
    <>
    <Button onClick={() => setVisible(!visible)} type='primary' size='large' shape='circle' icon={<FilePdfOutlined />} />
    <Modal
      width={1050}
      visible={Visible}
      title="PDF Informes"
      okText="Descargar"
      okButtonProps= {{
        shape: 'round'
      }}
      cancelButtonProps = {{
        shape: 'round'
      }}
      onOk={<Pdf targetRef={ref} filename="post.pdf">
      {({ toPdf }) => <Button icon={<DownloadOutlined />} type="primary" shape="round" onClick={toPdf}>Descargar</Button>}
    </Pdf>}
      cancelText="Cancelar"
      onCancel={() => setVisible(visible)}
    ><Pdf targetRef={ref} filename="Informe.pdf">
    {({ toPdf }) => <Button icon={<DownloadOutlined />} type="primary" shape="round" onClick={toPdf}>Descargar PDF</Button>}
  </Pdf><div width={950} style={{ borderStyle: 'outset', borderColor: 'White White White White', borderWidth: '40px 30px 10px 25px' }} ref={ref} className="Post">
  <div style={{ position: 'relative', top: '40px', left: '0px' }} ><h3>INFORME</h3></div>
  <div style={{ position: 'relative', top: '0px', left: '500px' }} ><img className="eltdf-light-logo" src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com.mx%2Fservicios%2Fgmail-tiene-nuevo-logo-se-fusiona-chat-docs-para-crear-google-workspace-sustituto-g-suite-para-productividad&psig=AOvVaw3EXj06cXJOj_2uEk1iE2Pj&ust=1629391760232000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPCyxLqDu_ICFQAAAAAdAAAAABAx' alt="light logo"/></div>
                <h4><div style={{ position: 'relative', top: '60px', left: '-310px' }}>
                  <Form.Item name='serviciosolicitado' label='Servicio solicitado:' {...ubc}>
                  <label style={{ display: 'none' }} htmlFor="feFirstName">Servicio solicitado</label>
                  <Space><Form.Item name='serviciosolicitado' label='.'>
                      <Input disabled
                        className="form-check-input"
                        type="radio"
                        name="serviciosolicitado"
                        value="M1" onChange={handleChange}
                        checked={info.serviciosolicitado === 'M1'}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        INR
                      </label></Form.Item></Space><Space>
                      <Form.Item name='serviciosolicitado' label='.'>
                      <Input disabled
                        className="form-check-input"
                        type="radio"
                        name="serviciosolicitado"
                        value="M2" onChange={handleChange}
                        checked={info.serviciosolicitado === 'M2'}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        6 Express
                      </label></Form.Item></Space><Space>
                      <Form.Item name='serviciosolicitado' label='.'>
                      <Input disabled
                        className="form-check-input"
                        type="radio"
                        name="serviciosolicitado"
                        value="M3" onChange={handleChange}
                        checked={info.serviciosolicitado === 'M3'}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        24 horas
                      </label></Form.Item></Space><Space>
                      <Form.Item name='serviciosolicitado' label='.'>
                      <Input disabled
                        className="form-check-input"
                        type="radio"
                        name="serviciosolicitado"
                        value="M4" onChange={handleChange}
                        checked={info.serviciosolicitado === 'M4'}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        48 horas
                      </label></Form.Item></Space>
  </Form.Item></div>
  <div style={{ position: 'relative', top: '35px' }}>
    <Space wrap><Form.Item name='confechalimite' label='Con fecha Limite:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="feLastName">Con fecha Limite</label>
                      <Row className="pl-5">
                    <Col>
                      <Form.Item name='confechalimite' label='.'>
                      <Input disabled
                        className="form-check-input"
                        type="radio"
                        name="confechalimite"
                        value="si" onChange={handleChange}
                        checked={info.confechalimite === 'si'}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        Si
                      </label></Form.Item>
                    </Col>
                    <Col>
                      <Form.Item name='confechalimite' label='.'>
                      <Input disabled
                        className="form-check-input"
                        type="radio"
                        name="confechalimite"
                        value="no" onChange={handleChange}
                        checked={info.confechalimite === 'no'}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        No
                      </label></Form.Item>
                    </Col>
                  </Row></Form.Item></Space></div><br></br>
                      <Space wrap>
  <Form.Item name='datetime' label='Fecha y Hora de encargo:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="inputState">Fecha y</label>
                      <Input disabled
                        type="datetime"
                        placeholder="fechayhoraencargo"
                        name="fechayhoraencargo"
                        value={moment(info.fechayhoraencargo).format('DD/MM/YYYY  hh:mm A')}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item>
                    <Form.Item name='quienencarga' label='Quien encarga:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="feLastName">Quien encarga</label>
                      <Input disabled type="text"
                        placeholder="quienencarga"
                        name="quienencarga"
                        value={info.quienencarga}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item>
                      </Space>
    <Row><div style={{ position: 'relative', top: '0px', left: '-30px' }}>
                      <Space wrap>
      <Form.Item name='confechalimite' label='N° de siniestro:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="inputState">N° de siniestro:</label>
                      <Input disabled
                        type="text"
                        placeholder="N° de siniestro"
                        name="nrodesiniestro"
                        value={info.nrodesiniestro}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item>
      <Form.Item name='ramos' label='Ramo:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="feAddress">Ramo</label>
                      <Input disabled
                        placeholder="ramo"
                        name="ramo"
                        value={info.ramo}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item>
      <Form.Item name='poliza' label='Poliza:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="feEmail">Poliza</label>
                      <Input disabled
                        type="text"
                        placeholder="poliza"
                        name="poliza"
                        value={info.poliza}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item></Space></div>
                      <div style={{ position: 'relative', top: '0px', left: '-60px' }}>
                      <Space wrap>
                      <Form.Item name='placa' label='Placa:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="feEmail">Placa</label>
                      <Input disabled
                        placeholder="placa"
                        name="placa"
                        value={info.placa}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item>
                      </Space></div><br></br><div style={{ position: 'relative', top: '0px', left: '-220px' }}>
                      <Form.Item name='motivodeenvio' label='Motivo de envio:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="feEmail">Motivo de envio:</label>
                      <Input disabled style={{ width: 620 }}
                        placeholder="motivodeenvio"
                        name="motivodeenvio"
                        value={info.motivodeenvio}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item></div><br></br>
                      <div style={{ position: 'relative', top: '0px', left: '-255px' }}>
                      <Form.Item name='calle' label='Calle:' {...ubc}>
                      <label style={{ display: 'none' }} htmlFor="feEmail">Calle:</label>
                      <Input disabled style={{ width: 620 }}
                        placeholder="calle"
                        name="calle"
                        value={info.calle}
                        className="form-control"
                        onChange={handleChange}
                      /></Form.Item></div>
                    <Row justify='space-around' >
                     <Space wrap>
                        <Form.Item name='distrito' label='Distrito:'>
                            <label style={{ display: 'none' }} htmlFor="feEmail">Distrito:</label>
                            <Input disabled style={{ width: 150 }}
                              placeholder="distrito"
                              name="distrito"
                              value={info.distrito}
                              className="form-control"
                              onChange={handleChange}
                            /></Form.Item>
                        <Form.Item name='provincia' label='Provincia:'>
                            <label style={{ display: 'none' }} htmlFor="feEmail">Provincia</label>
                            <Input disabled style={{ width: 150 }}
                              placeholder="provincia"
                              name="provincia"
                              value={info.provincia}
                              className="form-control"
                              onChange={handleChange}
                            /></Form.Item>
                      <Form.Item name='departamento' label='Departamento:' {...ubc}>
                            <label style={{ display: 'none' }} htmlFor="feEmail">Departamento:</label>
                            <Input disabled style={{ width: 150 }}
                              placeholder="departamento"
                              name="departamento"
                              value={info.departamento}
                              className="form-control"
                              onChange={handleChange}
                            /></Form.Item></Space>
                      </Row>
    </Row>
         <Row justify='space-around'>
        <div style={{ position: 'relative', top: '0px', left: '-50px' }}>
         <Col span={38}>
           <Form.Item
             label="Destinatario:"
             name="destinatario"
             ><label></label>
             <Input disabled className="form-control" style={{ width: 150 }}
                        placeholder="destinatario"
                        name="destinatario"
                        value={orden.destinatario} onChange={handleChange} />
           </Form.Item>
           <Form.Item
             label="Recibido por:"
             name="recibidopor"
             ><label></label>
             <Input disabled className="form-control" style={{ width: 150 }}
                        placeholder="recibidopor"
                        name="recibidopor"
                        value={orden.recibidopor} onChange={handleChange} />
           </Form.Item>
           <Form.Item
             label="Parentesco:"
             name="parentesco"
             ><label></label>
             <Input disabled className="form-control" style={{ width: 150 }}
                        placeholder="parentesco"
                        name="parentesco"
                        defaultValue={orden.parentesco} initialValue={orden.parentesco} onChange={handleChange}/>
           </Form.Item>
           <div style={{ position: 'relative', top: '0px' }}>
           <Form.Item
             label="Entrega bajo puerta:"
             name="entregabajopuerta"
             ><label></label>
             <Row className="pl-5">
                    <Col>
                      <Form.Item name='parentesco' label='.'>
                      <Input disabled
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
                      <Input disabled
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
                  </Row></Form.Item></div>
                  <div style={{ position: 'relative', top: '-20px' }}>
           <Form.Item
             label="N° Suministro:"
             name="nrodesuministro"
             ><label>
           </label>
             <Input disabled className="form-control" style={{ width: 150 }}
                        placeholder="nrodesuministro"
                        name="nrodesuministro"
                        defaultValue={orden.nrodesuministro} initialValue={orden.nrodesuministro} onChange={handleChange}/>
           </Form.Item></div><div style={{ position: 'relative', top: '-20px' }}>
           <Form.Item
             label="Entrega exitosa:"
             name="entregaexitosa"
             >
            <Row className="pl-5">
                    <Col>
                      <Form.Item name='parentesco' label='.'>
                      <Input disabled
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
                      <Input disabled
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
           </Form.Item></div><div style={{ position: 'relative', top: '-40px' }}>
           <Form.Item
             label="Fecha y hora:"
             name="fechayhoraentrega"
             ><label></label>
             <Input disabled type="datetime-local" style={{ width: 189 }}
                        name="fechayhoraentrega"
                        value={orden.fechayhoraentrega} onChange={handleChange} />
           </Form.Item></div>
           </Col></div>
           <Col span={11}>
           <Form.Item
             label="Celular"
             name="celular"
             ><label></label>
             <Input disabled className="form-control" style={{ width: 150 }}
                        placeholder="celular"
                        name="celular"
                        value={orden.celular} onChange={handleChange} />
           </Form.Item>
           <Form.Item
             label="Tipo de documento"
             name="tipodocumento"
             ><label></label>
             <Select style={{ width: 150 }}
                        className="form-control"
                        name="tipodocumento"
                        value={orden.tipodocumento}
                        onChange={handleChange}
                      >
                        <option value="EXT">EXT</option>
                        <option value="DNI">DNI</option>
                      </Select>
           </Form.Item>
           <Form.Item
             label="Documento"
             name="nrodocumento"
             ><label></label>
             <Input disabled className="form-control" style={{ width: 150 }}
                        placeholder="nrodocumento"
                        name="nrodocumento"
                        value={orden.nrodocumento} onChange={handleChange} />
           </Form.Item>
           <Form.Item
             label="Cargo fijo"
             name="cargofirmado"
             >
             <Row className="pl-5">
                  <Form.Item name='cargofirmado' label='.:'>
                    <Col>
                      <Input disabled
                        className="form-check-input"
                        type="radio"
                        name="cargofirmado"
                        value="true" onChange={handleChange}
                        checked={orden.cargofirmado === true}
                      /><label htmlFor="feEmail">Si</label>
                    </Col></Form.Item>
                    <Form.Item name='cargofirmado' label='.:' >
                    <Col>
                      <Input disabled
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
             >
             <Row className="pl-5">
                    <Col>
                    <Form.Item name='puertaalacalle' label='.:'>
                      <Input disabled
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
                      <Input disabled
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
             >
             <Row className="pl-5">
                    <Col>
                    <Form.Item name='zonaroja' label='.:'>
                      <Input disabled
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
                      <Input disabled
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
           </Row></h4>
               </div>
    </Modal>
    </>
  )
}
export default ModalPDF
