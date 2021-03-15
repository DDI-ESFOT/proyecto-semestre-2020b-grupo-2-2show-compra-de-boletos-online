import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



function IngregarPage(){

    return(
        <div className="container-fluid">
            <h1>Disfruta 2Show</h1>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="Usuario"
                    name="user"
                    rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Cotraseña"
                    name="password"
                    rules={[{ required: true, message: 'Ingresa tu contraseña!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="REcuerdame" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Ingresar
                    </Button>
                    <Button htmlType="button">
                        ¿No tienes cuenta?
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default IngregarPage;