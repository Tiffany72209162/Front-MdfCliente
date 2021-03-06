import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  Col,
  Row,
  Card,
} from "antd";
import { useDispatch } from "react-redux";
import { create as createCliente } from "../../../../Actions/Clientes/create";
import { url } from "../../../../config/Url";

const ModalCreate = ({ visible }) => {
  const dispatch = useDispatch();
  const [Visible, setVisible] = useState(visible);
  const [form] = Form.useForm();

  const OnVisibleModal = () => {
    setVisible(!Visible);
    form.resetFields();
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        const {
          confirm_password,
          nombres,
          apellidos,
          nombre_compania,
          area_departamento,
          ...newValues
        } = values;

        const newVa = {
          usuario: { ...newValues },
          nombres,
          apellidos,
          nombre_compania,
          area_departamento,
        };
        dispatch(
          createCliente(
            "https://apimdf.devopsacademy.pe/entidades/clientes/",
            newVa
          )
        );
        form.resetFields();
        setVisible(!Visible);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const ubc = {
    labelCol: { span: 10 },
    wrapperCol: { span: 10 },
  };

  return (
    <>
      <Button
        onClick={OnVisibleModal}
        type="primary"
        size="large"
        shape="round"
      >
        Nuevo
      </Button>

      <Modal
        visible={Visible}
        title="Nuevo Cliente"
        centered
        okText="Guardar"
        cancelText="Cancelar"
        onOk={onOk}
        onCancel={() => setVisible(!Visible)}
        width={950}
      >
        <Form
          id="form"
          form={form}
          name="ModalCreate"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <div>
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item
                  label="Nombres"
                  name="nombres"
                  rules={[{ required: true, message: "Ingrese sus nombres!" }]}
                  {...ubc}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Apellidos"
                  name="apellidos"
                  rules={[
                    { required: true, message: "Ingrese sus apellidos!" },
                  ]}
                  {...ubc}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Empresa"
                  name="nombre_compania"
                  rules={[
                    { required: true, message: "Ingrese nombre de Empresa!" },
                  ]}
                  {...ubc}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Departamento"
                  name="area_departamento"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese su area - departamento!",
                    },
                  ]}
                  {...ubc}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Perfil"
                  name="perfil"
                  rules={[{ required: true }]}
                  {...ubc}
                  initialValue={4}
                >
                  <Select disabled={true}>
                    <Select.Option value={1}>Administrador</Select.Option>
                    <Select.Option value={2}>Operador</Select.Option>
                    <Select.Option value={3}>Inspector</Select.Option>
                    <Select.Option value={4}>Cliente</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Card
                  title="Datos de Usuario"
                  style={{ width: 400, textAlign: "center" }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { type: "email", message: "Ingrese un E-mail valido!" },
                      { required: true, message: "Ingrese su E-mail!" },
                    ]}
                    {...ubc}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Contarse??a"
                    name="password"
                    rules={[
                      { required: true, message: "Ingrese su Contrase??a!" },
                    ]}
                    {...ubc}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirmar Contarse??a"
                    name="confirm_password"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Por favor confirme su contrase??a!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Las dos contrase??as que ingres?? no coinciden!"
                            )
                          );
                        },
                      }),
                    ]}
                    {...ubc}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Estado"
                    valuePropName="checked"
                    name="estado"
                    initialValue={true}
                  >
                    <Switch
                      disabled={true}
                      checkedChildren="ACTIVO"
                      unCheckedChildren="INACTIVO"
                    />
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreate;
