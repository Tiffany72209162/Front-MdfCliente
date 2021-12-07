import React from 'react'
import { Form, Input, Button, Checkbox, Row, Layout } from 'antd'
// import PropTypes from 'prop-types'

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('login', values)
  }
  const onFinishFailed = (err) => {
    console.log('login failed', err)
  }

  return (
    <>
      <Layout>
        <Layout.Content style={{ minHeight: '100vh' }} >
          <Row justify='center'align='middle' >
            <Form
            name='login'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </Row>
        </Layout.Content>
      </Layout>
    </>
  )
}

/* LoginPage.propTypes = {
} */

export default LoginPage
