import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Switch, Col, Row, Card } from 'antd'
import { useDispatch } from 'react-redux'
import { create as createInspector } from '../../../../Actions/Inspector/create'
import DrawerInspector from '../components/drawer'
import PropTypes from 'prop-types'
import { url } from '../../../../config/Url'
import { toast } from 'react-toastify'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
toast.configure()
const MySwal = withReactContent(SweetAlert)

const ModalCreate = ({ visible }) => {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(visible)
  //const [childData, setChildData] = useState([''])
  //const [provincias, setProvincias] = useState([''])
  //const [departamentos, setDepartamentos] = useState([''])
  //const [distritos, setDistritos] = useState([''])
  /*
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
  const OnVisibleModal = () => {
    setVisible(!Visible)
    form.resetFields()
  }
  const [form] = Form.useForm()
  /* COMBO LIST */

  const onOk = () => {
    form.validateFields()
      .then(values => {
        console.log(values)
        /*
        const datosEnviar =
        {
          ...values,
          ubigeo: childData,
          distrito: distritos,
          provincia: provincias,
          departamento: departamentos

        }*/
        var {confirm_password , ...newValues} = values;
        //dispatch(createInspector(url + '/inspector/', datosEnviar)) 
        dispatch(createInspector(url + '/inspectores/', newValues)) 
        /*
        MySwal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Se guardo correctamente ...',
          didOpen: async () => {}
        })*/
        setVisible(!Visible)
        window.location.reload(true)
        form.resetFields()
      })
      .catch(FieldsError => {
        //console.log(childData)
        //console.log(distritos)
        //console.log(provincias)
        console.log('campos erroneos', FieldsError)
      })
  }
  const ubc = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 }
  }
  return (
    <>
    <Button onClick={OnVisibleModal} 
            type='primary' 
            size='large' 
            shape='round'>Nuevo</Button>
    <Modal
      visible={Visible}
      title='Añadir Nuevo Inspector'
      centered
      okText='Guardar'
      cancelText='Cancelar'
      onOk={onOk}
      onCancel={() => setVisible(!Visible)}
      width={950}
    >
      <Form
      id='form'
      form={form}
      name='ModalCreate'
          labelCol={{ span: 8 }}
          wrapperCol={{  span: 16 }}
      >
        <div>
        <Row justify='space-around' >
            <Col span={10}>
              <Form.Item label='ID'
                          name='id' {...ubc}>
                <Input type="number"/>
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
                    <Input.Password />
                  </Form.Item>
                  <Form.Item  label='Confirmar Contraseña'
                              name='confirm_password'
                              dependencies={['password']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Por favor confirme su contraseña!',
                                },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Las dos contraseñas que ingresó no coinciden!'));
                                  },
                                }),
                              ]}
                              {...ubc}>
                    <Input.Password/>
                  </Form.Item>
                  <Form.Item label='Estado'
                            valuePropName='checked'
                            name='estado'
                            initialValue={true} {...ubc}>
                    <Switch disabled={true} checkedChildren='ACTIVO' unCheckedChildren='INACTIVO'/>
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

ModalCreate.propTypes = {
  visible: PropTypes.bool
}

export default ModalCreate
