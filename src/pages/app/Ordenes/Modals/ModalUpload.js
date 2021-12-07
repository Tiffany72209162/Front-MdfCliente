import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Upload, message, Modal } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

/* UPLOAD */
/* https://github.com/ant-design/ant-design/blob/master/components/upload/demo/upload-manually.md */

const propsUpload = {
  name: 'file',
  accept: '.csv',
  multiple: false,
  action: 'http://localhost:8000/api/importarcsv/',
  Headers: {
    authorization: 'token fcb5a53a47d062f4f5f6c82038914f69fdd04c59'
  },
  onChange (info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} Archivo cargado correctamente`)
    } else if (status === 'error') {
      message.error(`${info.file.name} Archivo no cargado`)
    }
  },
  onDrop (e) {
    console.log('Archivos soltados', e.dataTransfer.files)
  }
}

const ModalUpload = ({ visible }) => {
  const [Visible, setVisible] = useState(visible)

  useEffect(() => {
    // console.log(Visible)
    return () => {
      // console.log('cleanup') // se ejecuta cuando se desmonta el componente
    }
  }, [Visible])

  return (
    <>
      <Button onClick={() => setVisible(!Visible)} type='dashed' size='large'icon={<UploadOutlined />} > Importar CSV</Button>

    <Modal
      title="Importar ordenes en formato CSV"
      visible={Visible}
      onOk={() => setVisible(!Visible)}
      width={1000}
      centered={true}
      closable={false}
      cancelButtonProps = { { disabled: true, type: 'text' } }
      cancelText= ' '
    >
      <Upload.Dragger {...propsUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click o arrastre y suelte su archivo</p>
        <p className="ant-upload-hint">
          solo se admite CSV
        </p>
      </Upload.Dragger>
    </Modal>
    </>
  )
}

ModalUpload.propTypes = {
  visible: PropTypes.bool
}

export default ModalUpload
