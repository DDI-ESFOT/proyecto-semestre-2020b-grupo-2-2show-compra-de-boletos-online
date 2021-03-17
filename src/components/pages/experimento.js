import React from 'react'
import {Form, Upload, Button} from 'antd'
import { UploadOutlined } from "@ant-design/icons";

export default function experimento() {
  return (
    <div>
      
    <Form>
    <Form.Item
                name="photo"
                label="Foto"
                valuePropName="fileList"
                getValueFromEvent=''
                extra="Selecciona un archivo .jpg"
              >
                <Upload name="logo" action={null} listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
    </Form>


    </div>
  )
}
