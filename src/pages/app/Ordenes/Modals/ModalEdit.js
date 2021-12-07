import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'

// eslint-disable-next-line react/prop-types
const ModalEdit = ({ data, visible }) => {
  const [Visible, setVisibleModal] = useState(visible)

  useEffect(() => {
    console.log(visible)
  }, [Visible])

  return (
    <>
    <Modal title="Basic Modal" visible={visible} onOk={() => { setVisibleModal(!Visible) } } onCancel={ setVisibleModal(!Visible) }>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
    </>
  )
}

export default ModalEdit
