import React from "react";
import "../../index.css";
import { Row, Col, Image, Button, Upload, message, Input } from "antd";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function CrearEventoVistaPrevia(props) {
  const [state, setState] = React.useState(false);

  const style = {
    display: "inline-block",
    padding: "10px 20px 0",
  };
  const style1 = {
    width: "180px",
    height: "180px",
    fontSize: "250px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    background: "#E0E6ED",
    transform: "translateY(20px)",
  };
  const style2 = {
    display: "inline-block",
    padding: "0 130px 30px",
  };
  const styleImage = {
    backgroundImage:
      "url(https://essaeformacion.com/storage/gcs/common_fields/posts/201/K7IeYEBz2gxajLrXLfycSK1ymGIwiP0BpvUANChrQzCVDWLETeQv8TaHVE9D.jpg)",
    height: "150px",
  };
  const stylePadding = {
    paddingBottom: "100px",
  };
  const styleNewPadding = {
    paddingBottom: "30px",
  };

  const { loading, imageUrl } = state;
  const uploadButton = (
    <div style={style1}>
      {loading ? <LoadingOutlined /> : <CloseOutlined />}
    </div>
  );

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Puedes subir solamente arechivos JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Tamaño de la imagen menor a 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <div align="middle">
      <Row>
        <Col>
          <div style={stylePadding}>
            <div style={styleImage}>
              <h1> Widinson</h1>

              <Image
                src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg"
                width={150}
                height={150}
                preview={false}
                style={{ borderRadius: "50%" }}
              />

              <h2> Vista Previa</h2>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Row style={styleNewPadding}>
            <Col span={8} style={style}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={8} style={style}>
              <h4>
                Widinson
                <br />
                23 de Julio
                <br />7 pm
              </h4>
              <TextArea
                style={{ resize: "none" }}
                rows={3}
                placeholder="Ven y disfruta de un momnto inolvidable con Widinson."
                disabled
              />
              <h4>
                Entrada: 20 USD
                <br />
                Golden Pass: 100 USD
              </h4>
            </Col>
            <Col span={8} style={style}>
              <iframe
                width="220"
                height="145"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
              />
              <h4>Video Promocional</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Button type="primary" danger>
                  Publicar
                </Button>
              </Row>
              <Row>
                <Col span={12} style={style2}>
                  <Button type="primary">Cancelar</Button>
                </Col>
                <Col span={12} style={style2}>
                  <Button type="primary">Editar</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
