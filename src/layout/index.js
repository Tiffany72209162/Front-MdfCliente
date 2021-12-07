import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Avatar, Col, Dropdown, Image, Layout, Menu, Row, Typography } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { FilePdfFilled, UserOutlined, FolderOutlined } from '@ant-design/icons'


const { Header, Content, Footer, Sider } = Layout

const Main = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true)
  const location = useLocation()
  const menuLogin = (
    <Menu>
      <Menu.Item>
        Mi perfil
      </Menu.Item>
      <Menu.Item>
        Cerrar Sesion
      </Menu.Item>
    </Menu>
  )
  document.title = location.pathname.replace(/\//g, '')

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <Row align="middle" justify="center" style={ { padding: '10%' } } >
          </Row>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
            <Menu.Item key="1" icon={<FolderOutlined />} >
            <Link to="/ordenes">Ordenes</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/inspectores">Inspectores</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FilePdfFilled />}>
            <Link to="/informes">Informes</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header >
            <Row justify='space-between' align='bottom' >
              <Col>
                <Typography.Title level={2} type='success' >{location.pathname.replace(/\//g, '')}</Typography.Title>
              </Col>
              <Col>
              <Dropdown overlay={menuLogin} trigger={['click']} >
                <Avatar src={<Image preview={false} />} size='large' />
              </Dropdown>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Content style={{ margin: '1%', backgroundColor: 'white' }} >
              <div style={{ padding: 24, minHeight: 360 }}>
                {children}
              </div>
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>Creado por <strong>Pachaqtect ©2021</strong></Footer>
        </Layout>
      </Layout>
    </>
  )
}

Main.propTypes = {
  children: PropTypes.element
}

export default Main
