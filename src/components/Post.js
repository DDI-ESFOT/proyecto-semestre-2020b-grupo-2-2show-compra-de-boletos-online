import React from "react";

import { Form, Input, Button, Upload } from "antd";
import { db, auth, storage } from "../firebase";

import { UploadOutlined } from "@ant-design/icons";

export default function Post(props) {
  const [loading, setLoading] = React.useState(false);

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const registrar = async (data) => {
    const snapshotPost = await storage
      .ref(`imgPost/${data.imgPost.name}`)
      .put(data.imgPost);
    const postURL = await snapshotPost.ref.getDownloadURL();

    const tiempoTranscurrido = Date.now();
    const fechaPost = new Date(tiempoTranscurrido);

    const { textoPost } = data;
    const { uid } = auth;
    const uidUser = uid;
    const likesPost = 0;
    await db.collection("posts").add({
      textoPost,
      fechaPost,
      postURL,
      uidUser,
      likesPost,
    });
  };

  const onFinish = async (data) => {
    setLoading(true);
    console.log("valores", data);
    console.log(data.fechaEvento);
    await registrar({ ...data, imgPost: data.imgPost[0].originFileObj });
    setLoading(false);
    alert("Evento Creado!");
  };

  return (
    <div>
      <Form
        labelCol={{
          span: 11,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item name="textoPost">
          <Input />
        </Form.Item>
        <Form.Item
          name="imgPost"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="imgEvento" action={null} listType="picture">
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Postear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
