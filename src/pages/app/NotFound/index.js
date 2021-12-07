import { Button, Result } from 'antd'
import React from 'react'

// eslint-disable-next-line react/prop-types
const NotFound = ({ match, location, history }) => {
  console.log('match', match)
  console.log('location', location)
  console.log('history', history)
  return (
    <Result
    status="404"
    title="Not Found"
    subTitle="404"
    extra={<Button type="primary" href='/' >Volver al Inicio</Button>}
  />
  )
}

export default NotFound
