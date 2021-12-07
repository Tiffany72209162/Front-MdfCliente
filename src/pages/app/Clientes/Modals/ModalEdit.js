import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  Switch,
  Card,
} from "antd";
import { useDispatch } from "react-redux";
import { update as updateCliente } from "../../../../Actions/Clientes/update";
import axios from "axios";
import { url } from "../../../../config/Url";

const ModalEdit = ({ visible, idCliente }) => {
  const dispatch = useDispatch();
  const [Visible, setVisible] = useState(visible);
  const [editForm, setEditForm] = useState("");
  const [form] = Form.useForm();

  const getClienteId = async (id) => {
    await axios
      .get("https://apimdf.devopsacademy.pe/entidades/clientes/" + id)
      .then((response) => {
        console.log(response);
        setEditForm(response.data.usuario);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getClienteId(idCliente);
  }, []);

  const onEdit = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(
          updateCliente(
            `https://apimdf.devopsacademy.pe/entidades/clientes/${values.id}/`,
            values
          )
        );
        form.resetFields();
        setVisible(!Visible);
        window.location.reload(true);
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
        onClick={() => setVisible(!Visible)}
        type="primary"
        size="large"
        shape="round"
      >
        {" "}
        Editar{" "}
      </Button>
      <Modal
        visible={Visible}
        title="Editar Cliente"
        centered
        okText="Editar"
        cancelText="Cancelar"
        onOk={onEdit}
        onCancel={() => setVisible(!Visible)}
        width={950}
      >
        <Form
          id="formEdit"
          form={form}
          name="ModalEdit"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={editForm}
        >
          <div>
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item
                  label="id"
                  style={{ display: "none" }}
                  name="id"
                  {...ubc}
                >
                  <Input disabled={true} />
                </Form.Item>
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
                  name="perfil"
                  label="Perfil"
                  rules={[{ required: true }]}
                  {...ubc}
                  initialValue={1}
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
                    label="Contraseña"
                    name="password"
                    rules={[
                      { required: true, message: "Ingrese su Contraseña!" },
                    ]}
                    {...ubc}
                  >
                    <Input.Password disabled={true} />
                  </Form.Item>
                  <Form.Item
                    label="Estado"
                    valuePropName="checked"
                    name="estado"
                    initialValue="ACT"
                  >
                    <Switch
                      disabled={false}
                      checkedChildren="ACTIVO"
                      unCheckedChildren="INACTIVO"
                    />
                  </Form.Item>
                  <Button type="secondary" size="large" shape="round" {...ubc}>
                    {" "}
                    Cambiar Contraseña{" "}
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEdit;
