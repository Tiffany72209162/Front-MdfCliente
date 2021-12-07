import { useState } from 'react'
import { Image, Layout, Menu, Row } from 'antd'
import {
  FilePdfFilled,
  UserOutlined,
  FolderOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import pqt from '../../../assets/img/pqt.png'

const { Header, Content, Footer, Sider } = Layout

const Main = ({
  // eslint-disable-next-line react/prop-types
  children
}) => {
  const [collapsed, setCollapsed] = useState(true)
  // const location = useLocation()

  /*   useEffect(() => {
    console.log('pageview:', location.pathname)
  }) */

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <Row align="middle" justify="center" style={ { padding: '10%' } } >
            <Image width={130} preview={false} src={pqt} />
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
          <Header style={{ padding: 0 }} />
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content style={{ margin: '1%', backgroundColor: 'white' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Creado por <strong>Pachaqtect ©2021</strong></Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default Main
