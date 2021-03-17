import React, { useState } from "react";
import {Form, Input, Button, Radio, DatePicker, InputNumber, TimePicker, Upload} from "antd";

import { UploadOutlined} from '@ant-design/icons';

const FormEvents = () => {
    const [componentSize, setComponentSize] = useState("default");

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    return (
        <>
            <Form
                labelCol={{
                    span: 9,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Nombre del Evento">
                    <Input />
                </Form.Item>
                <Form.Item label="Hora del Evento">
                    <TimePicker />
                </Form.Item>
                <Form.Item label="Fecha del Evento">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Tickets disponibles">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Pase Gold" name="paseGold">
                    <Radio.Group>
                        <Radio.Button value="Si">Si</Radio.Button>
                        <Radio.Button value="No">No</Radio.Button>
                    </Radio.Group>
                    <Form.Item label="Costo Pase Gold">
                        <InputNumber />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Donación" name="donacion">
                    <Radio.Group>
                        <Radio.Button value="Si">Si</Radio.Button>
                        <Radio.Button value="No">No</Radio.Button>
                    </Radio.Group>
                    <Form.Item label="Costo Donación Mínima">
                        <InputNumber />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    name="uploadImgEvento"
                    label="Poster del Evento"
                    valuePropName="fileList"
                    //getValueFromEvent={normFile}

                >
                    <Upload name="imgEvento" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click para subir</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="uploadVideoEvento"
                    label="Video del Evento"
                    valuePropName="fileList"
                    //getValueFromEvent={normFile}

                >
                    <Upload name="videoEvento" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click para subir</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="url del Evento">
                    <Input />
                </Form.Item>


                <Form.Item>
                    <Button>Crear Evento</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default FormEvents;