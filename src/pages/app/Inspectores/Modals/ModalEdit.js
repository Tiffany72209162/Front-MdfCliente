import React, { useState, useEffect } from 'react'
import { EditFilled } from '@ant-design/icons'
import { Button, Form, Input, Modal, Select, Row, Col, Switch, Card } from 'antd'
import { useDispatch } from 'react-redux'
import { update as updateInspector } from '../../../../Actions/Inspector/update'
import PropTypes from 'prop-types'
import DrawerInspector from '../components/drawerEditar'
import axios from 'axios'
import { toast } from 'react-toastify'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//toast.configure()
//const MySwal = withReactContent(SweetAlert)
//const Token = 'token ' + localStorage.getItem('data')
import { isUndefined } from 'lodash'
import { url } from '../../../../config/Url'

ModalEdit.propTypes = {
  visible: PropTypes.bool,
  idInspector: PropTypes.number
}

function ModalEdit ({ visible, idInspector }) {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(visible)
  const [form] = Form.useForm()
  const [editForm, setEditForm] = useState('')
  /*
  const [childData, setChildData] = useState([''])
  const [provincias, setProvincias] = useState([''])
  const [departamentos, setDepartamentos] = useState([''])
  const [distritos, setDistritos] = useState([''])

  const Onenviar = (value) => {
    setChildData(value)
    console.log(value)
    console.log(childData)
  } 
  const onProvincia = (value) => {
    setProvincias(value)
    console.log(value)
  }
  const onDepartamento = (value) => {
    setDepartamentos(value)
    console.log(value)
  }
  const onDistrito = (value) => {
    setDistritos(value)
    console.log(value)
  }*/

  const getInspectorId = (numero) => {
    /*
    axios(url + '/inspector/' + numero +'/',{
      method: 'GET',
      headers: {
        Authorization: Token
      }
    })*/
    axios.get(url + '/inspectores/' + numero)
      .then(response => {
        setEditForm(response.data)
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getInspectorId(idInspector)
  }, [])

  const onEdit = () => {
    form.validateFields()
      .then((values) => {
        /*
        const formVal = {
          ...values,
          ubigeo: childData,
          alcance: values.alcance,
          apellidos: editForm.apellidos,
          celular1: editForm.celular1,
          celular2: values.celular2,
          correo: editForm.correo,
          departamento: departamentos.departamento,
          direccion: editForm.direccion,
          distrito: distritos,
          empresa: values.empresa,
          estado: values.estado,
          id: values.id,
          mediodepago: values.mediodepago,
          nombres: editForm.nombres,
          nrodocumento: editForm.nrodocumento,
          observaciones: values.observaciones,
          provincia: provincias,
          referencias: values.referencias,
          tipodocumento: values.tipodocumento,
          tiposervicio: values.tiposervicio          
        }
        dispatch(updateInspector(url + `/inspector/${editForm.id}/`, formVal))*/
        dispatch(updateInspector(url + `/inspectores/${values.id}/`, values))
        form.resetFields()
        /*
        MySwal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Se actualizo correctamente...',
          didOpen: async () => {}
        })*/
        setVisible(!Visible)
        window.location.reload(true)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
        //console.log('Validate Failed:', provincias)
      })
  }
  const ubc = {
    labelCol: { span: 10 },
    wrapperCol: { span: 10 }
  }
  /*
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }*/
  return (
    <>
    <Button onClick={() => setVisible(!visible)}
            type='primary' 
            size='large' 
            shape='circle' 
            icon={<EditFilled />} />
    <Modal
      visible={Visible}
      title="Editar Inspector"
      centered
      okText="Editar"
      cancelText="Cancelar"
      onOk={onEdit}
      onCancel={() => setVisible(visible)}
      width={950}      
    >
    <Form
          id='formEdit'
          form={form}
          name='ModalEdit'
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 16 }}
          initialValues={editForm}
    >
      <div>
        <Row justify='space-around' >
            <Col span={10}>
              <Form.Item label='ID'
                          name='id' 
                          {...ubc}>
                <Input type="number"
                        disabled={true}/>
              </Form.Item>
              <Form.Item label='Nombres' 
                          name='nombres' 
                          rules={[{ required: true, message: 'Ingrese sus nombres!' }]} {...ubc}>
                <Input/>
              </Form.Item>
              <Form.Item label='Apellidos' 
                          name='apellidos' 
                          rules={[{ required: true, message: 'Ingrese sus apellidos!' }]} {...ubc}>
                <Input/>
              </Form.Item>
              <Form.Item label='Tipo de Documento' 
                          name='tipodocumento' 
                          initialValue='DNI' {...ubc}>
                <Select defaultValue='DNI' 
                        virtual={false}>
                  <Select.Option value='EXT'>EXT</Select.Option>
                  <Select.Option value='DNI'>DNI</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='N° de documento' 
                          name='nrodocumento' 
                          rules={[{ required: true, message: 'Ingrese su número de documento!' },
                                  { max: 8, message: 'Ingrese menos de 8 números' }]} {...ubc}>
              <Input/>
              </Form.Item>
              <Form.Item label='Empresa'
                            name='empresa'
                            rules={[{ required: true, message: 'Ingrese su empresa!' }]} {...ubc}>
                <Input/>
              </Form.Item>
              <Form.Item label='Celular 1'
                          name='celular1'
                          rules={[{ required: true, message: 'Ingrese número de celular1' }]} {...ubc}>
                <Input type="number"/>
              </Form.Item>
              <Form.Item label='Celular 2'
                          name='celular2'
                          {...ubc}>
                <Input type="number"/>
              </Form.Item>
              <Form.Item label='Dirección'
                          name='direccion'
                          rules={[{ required: true, message: 'Ingrese su dirección!' }]} {...ubc}>
                <Input/>
              </Form.Item>              
              <Form.Item className='form-inspector'
                            label='Referencia'
                            name='referencia' {...ubc}>
                  <Input.TextArea className='text-area'/>
              </Form.Item>
              <Form.Item label='Departamento'
                          name='departamento' {...ubc}>
                <Input/>
              </Form.Item>
              <Form.Item label='Provincia'
                          name='provincia' {...ubc}>
                <Input/>
              </Form.Item>
              <Form.Item label='Distrito'
                          name='distrito' {...ubc}>
                <Input/>
              </Form.Item>              
            </Col>
            <Col span={10}>
              <Card title="Datos de Usuario" style={{ width: 400 }}>
                  <Form.Item  label="Perfil"
                            name="perfil"
                            rules={[{ required: true }]} {...ubc}
                            initialValue={3}>
                    <Select disabled={true}>
                      <Select.Option value={1}>Administrador</Select.Option>
                      <Select.Option value={2}>Operador</Select.Option>
                      <Select.Option value={3}>Inspector</Select.Option>
                      <Select.Option value={4}>Cliente</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label='Email'
                              name='email' 
                              rules={[{ required: true, message: 'Ingrese su correo electrónico!' },
                              { type: 'email', message: 'Ingrese un correo válido' }]} {...ubc}>
                    <Input/>
                  </Form.Item>
                  <Form.Item  label='Contraseña'
                              name='password'
                              rules={[{ required: true, message: 'Ingrese su Contraseña!' }]} {...ubc}
                              >
                    <Input.Password disabled={true}/>
                  </Form.Item>
                  <Form.Item label='Estado'
                            valuePropName='checked'
                            name='estado'
                            {...ubc}>
                    <Switch disabled={false} checkedChildren='ACTIVO' unCheckedChildren='INACTIVO'/>
                  </Form.Item>
                </Card>
                <br/>
                <Form.Item label='Medio de pago'
                            name='mediodepago' {...ubc}>
                  <Input/>
                </Form.Item>
                <Form.Item label='Alcance'
                            name='alcance'
                            initialValue='URBANO' {...ubc}>
                  <Select defaultValue='URBANO'>
                    <Select.Option value='URBANO'>URBANO</Select.Option>
                    <Select.Option value='PERIFERICA'>PERIFERICA</Select.Option>
                    <Select.Option value='AMBOS'>AMBOS</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Tipo de servicio'
                            name='servicio'
                            initialValue='MENSAJERO' {...ubc}>
                  <Select defaultValue='MENSAJERO' getPopupContainer={() => document.getElementById('form')}>
                    <Select.Option value='MENSAJERO'>MENSAJERO</Select.Option>
                    <Select.Option value='DELIVERY'>DELIVERY</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item className='form-inspector'
                            label='Observacion'
                            name='observacion'>
                  <Input.TextArea className='text-area'/>
                </Form.Item>
                <Form.Item label='Cobertura'
                          name='cobertura' {...ubc}>
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </div>
    </Form>
    </Modal>
    </>
  )
}
export default ModalEdit
