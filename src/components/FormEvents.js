import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  TimePicker,
  Upload,
  Row,
  Modal,
  Col,
  Image,
  message,
  Result,
} from "antd";
import { db, auth, storage } from "../firebase";
import { UploadOutlined } from "@ant-design/icons";

const FormEvents = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // Preview Modal
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  // Exit Modal and Create Event Page
  const [exiting, setExiting] = React.useState(false);

  //states de los campos a ingresar en el formulario
  const [bannerEvento, setBannerEvento] = useState("");
  const [costoDonacion, setCostoDonacion] = useState("");
  const [costoEntrada, setCostoEntrada] = useState("");
  const [costoGolden, setCostoGolden] = useState("");
  const [descripEvento, setDescripEvento] = useState("");
  const [entradasDisp, setEntradasDisp] = useState("");
  const [fechaProgramada, setFechaProgramada] = useState("");
  const [horaProgramada, setHoraProgramada] = useState("");
  const [goldenDisp, setGoldenDisp] = useState("");
  const [nomEvento, setNomEvento] = useState("");
  const [urlEvento, setUrlEvento] = useState("");
  const [imgEvent, setImgEvent] = useState({
    previewImage: "",
  });
  const [vidEvent, setVidEvent] = useState({
    previewVideo: "",
  });
  const [videoEvento, setVideoEvento] = useState("");
  const [nomPremio, setNomPremio] = useState("");
  const [descripPremio, setDescripPremio] = useState("");
  const [imgPremio, setImgPremio] = useState("");
  const [statusImg, setStatusImg] = React.useState("");
  const [successImg, setSuccessImg] = React.useState(false);
  const [statusVid, setStatusVid] = React.useState("");
  const [successVid, setSuccessVid] = React.useState(false);
  const [loadImg, setLoadImg] = React.useState(false);
  const [loadVid, setLoadVid] = React.useState(false);

  //funcion para subir el evento a la base de datos

  const registrar = async (data) => {
    const snapshotBanner = await storage
      .ref(`imgBannerEvento/${data.uploadImgEvento.name}`)
      .put(data.uploadImgEvento);
    const bannerURL = await snapshotBanner.ref.getDownloadURL();
    const snapshotVideo = await storage
      .ref(`videoBannerEvento/${data.uploadVideoEvento.name}`)
      .put(data.uploadVideoEvento);
    const videoURL = await snapshotVideo.ref.getDownloadURL();
    const snapshotImgPremio = await storage
      .ref(`imgPremio/${data.uploadImgPremio.name}`)
      .put(data.uploadImgPremio);
    const imgPremioURL = await snapshotImgPremio.ref.getDownloadURL();

    console.log("URL de premio", imgPremioURL);

    setBannerEvento(await bannerURL);
    console.log("BANNER", bannerEvento);
    setFechaProgramada(await data.fechaEvento);
    console.log("fecha", fechaProgramada._d);
    setHoraProgramada(await data.horaEvento);
    console.log("hora", horaProgramada);
    setImgPremio(imgPremioURL);
    setVideoEvento(videoURL);

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    await db.collection("eventos").add({
      nomEvento: nomEvento,
      entradasDisp: entradasDisp,
      costoEntrada: costoEntrada,
      costoDonacion: costoDonacion,
      urlEvento: urlEvento,
      costoGolden: costoGolden,
      goldenDisp: goldenDisp,
      bannerEvento: bannerEvento,
      videoEvento: videoEvento,
      uid: props.infoUser.uid,
      descripEvento: descripEvento,
      //fechaProgramada: fechaProgramada._d,

      //creacion del evento
      fechaCreacion: hoy,
      nomPremio: nomPremio,
      descripPremio: descripPremio,
      imgPremio: imgPremio,
      uidGanador: "",
      imgGanador: "",
      nomGanador: "",
    });
  };

  // Function Button - Enable modal
  const handlePreview = () => {
    setIsModalVisible(true);
  };

  const onFinish = async (data) => {
    setLoading(true);
    console.log("valores", data);
    console.log(data.fechaEvento);
    await registrar({
      ...data,
      uploadImgEvento: data.uploadImgEvento[0].originFileObj,
      uploadVideoEvento: data.uploadVideoEvento[0].originFileObj,
      uploadImgPremio: data.uploadImgPremio[0].originFileObj,
    });
    // Extra code
    setTimeout(() => {
      setIsModalVisible(false);
      setLoading(false);
    }, 3000);
    // End
    alert("Evento Creado!");
  };

  // Function Button - Close modal, and Exit create event page
  const handleCancel = () => {
    setExiting(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setExiting(false);
    }, 1000);
  };
  // Function Button - Return create event page and edit
  const handleEdit = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeImg = (file) => {
    setLoadImg(true);
    setSuccessImg(true);
    setStatusImg("success");
  };

  const onPreviewImg = async (file) => {
    setSuccessImg(false);
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setImgEvent({ previewImage: src });
  };

  const onChangeVid = () => {
    setLoadVid(true);
    setSuccessVid(true);
    setStatusVid("success");
  };

  const onPreviewVid = async ({ originFileObj, url: src }) => {
    setSuccessVid(false);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setVidEvent({ previewVideo: src });
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <>
      <Row>
        <h1>Llene el siguiente formulario para crear su evento</h1>
      </Row>
      <Row>
        <Form
          labelCol={{
            span: 11,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Nombre del Evento" required name="nomEvento">
            <Input
              onChange={(e) => setNomEvento(e.target.value)}
              value={nomEvento}
            />
          </Form.Item>
          <Form.Item
            label="Descripción del Evento"
            required
            name="descripEvento"
          >
            <Input.TextArea
              onChange={(e) => setDescripEvento(e.target.value)}
              value={descripEvento}
            />
          </Form.Item>

          <Form.Item label="Hora del Evento" name="horaEvento">
            <TimePicker onChange={(e) => setHoraProgramada(e.toString())} />
          </Form.Item>
          <Form.Item label="Fecha del Evento" name="fechaEvento">
            <DatePicker
              onChange={(e) => setFechaProgramada(e.toLocaleString())}
            />
          </Form.Item>
          <Form.Item label="Tickets disponibles" required name="entradasDisp">
            <Input
              onChange={(e) => setEntradasDisp(e.target.value)}
              value={entradasDisp}
            />
          </Form.Item>
          <Form.Item label="Costo Ticket" required name="costoEntrada">
            <Input
              onChange={(e) => setCostoEntrada(e.target.value)}
              value={costoEntrada}
            />
          </Form.Item>

          <Form.Item label="Pases Gold Disponibles" name="goldenDisp">
            <Input
              onChange={(e) => setGoldenDisp(e.target.value)}
              value={goldenDisp}
            />
          </Form.Item>
          <Form.Item label="Costo Pase Gold" required name="costoGolden">
            <Input
              onChange={(e) => setCostoGolden(e.target.value)}
              value={costoGolden}
            />
          </Form.Item>
          <Form.Item label="Costo Donación Mínima" name="costoDonacion">
            <Input
              onChange={(e) => setCostoDonacion(e.target.value)}
              value={costoDonacion}
            />
          </Form.Item>

          <Form.Item
            name="uploadImgEvento"
            label="Poster del Evento"
            valuePropName="fileList"
            getValueFromEvent={normFile} //esto me devuelve el filelist
            extra="Poster para mostrar el evento"
          >
            <Upload
              name="imgEvento"
              action={null}
              className="uploadImg"
              listType="picture"
              maxCount={1}
              onPreview={onPreviewImg}
              onChange={onChangeImg}
            >
              <Button icon={<UploadOutlined />}>Click para subir</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="uploadVideoEvento"
            label="Video del Evento"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="videoEvento"
              action={null}
              listType="picture"
              maxCount={1}
              onPreview={onPreviewVid}
              onChange={onChangeVid}
            >
              <Button icon={<UploadOutlined />}>Click para subir</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="url del Evento" required name="urlEvento">
            <Input
              onChange={(e) => setUrlEvento(e.target.value)}
              value={urlEvento}
            />
          </Form.Item>

          <h2>Escriba la informacion del Premio a Sortear</h2>
          <Form.Item label="Nombre del Premio" required name="nomPremio">
            <Input
              onChange={(e) => setNomPremio(e.target.value)}
              value={nomPremio}
            />
          </Form.Item>
          <Form.Item
            label="Descripción del Premio"
            required
            name="descripPremio"
          >
            <Input.TextArea
              onChange={(e) => setDescripPremio(e.target.value)}
              value={descripPremio}
            />
          </Form.Item>
          <Form.Item
            name="uploadImgPremio"
            label="Foto del Premio"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="videoEvento" action={null} listType="picture">
              <Button icon={<UploadOutlined />}>Click para subir</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ justifyContent: "center" }}>
            <Row>
              <Button
                type="primary"
                danger
                onClick={handlePreview}
                className="botonReusable"
              >
                Vista Previa
              </Button>
            </Row>
            <Modal
              style={{
                textAlign: "center",
              }}
              title="Vista Previa"
              centered
              visible={isModalVisible}
              closable={false}
              width="100%"
              footer={[
                <Button
                  style={{ margin: "20px 0 20px" }}
                  key="link"
                  //            <Link>                        // Events Page
                  type="primary"
                  loading={exiting}
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>,
                <Button
                  style={{ margin: "0 20%" }}
                  htmlType="submit"
                  type="primary"
                  loading={loading}
                >
                  Publicar
                </Button>,
                <Button
                  style={{ margin: "20px 250px 20px 0" }}
                  key="back"
                  type="primary"
                  danger
                  onClick={handleEdit}
                >
                  Editar
                </Button>,
              ]}
            >
              <Row>
                <Col flex="auto" style={{ margin: "0 10%" }}>
                  <Row>
                    <Col span={8}>
                      {loadImg ? (
                        successImg ? (
                          <Result
                            status={statusImg}
                            title="Imagen Encontrada! Lista para subir..."
                            subTitle="Por favor, Botón(Publicar) para subir la imagen."
                          />
                        ) : (
                          <Image width={200} src={imgEvent.previewImage} />
                        )
                      ) : (
                        <Result
                          status="error"
                          title="Imagen no encontrado!"
                          subTitle="Por favor, regresa Botón(Editar) y sube el imagen."
                        />
                      )}
                    </Col>
                    <Col span={8}>
                      <h4>
                        {nomEvento}
                        <br />
                        {fechaProgramada}
                        <br />
                        {horaProgramada}
                      </h4>
                      <Input.TextArea
                        style={{ resize: "none" }}
                        rows={3}
                        placeholder={descripEvento}
                        disabled
                      />
                      <h4>
                        Entrada: {costoEntrada} USD
                        <br />
                        Golden Pass: {costoGolden} USD
                      </h4>
                    </Col>
                    <Col span={8}>
                      {loadVid ? (
                        successVid ? (
                          <Result
                            status={statusVid}
                            title="Video Encontrado! Listo para subir..."
                            subTitle="Por favor, Botón(Publicar) para subir el video."
                          />
                        ) : (
                          <video
                            src={vidEvent.previewVideo}
                            width="220"
                            height="145"
                            controls
                          />
                        )
                      ) : (
                        <Result
                          status="error"
                          title="Video no encontrado!"
                          subTitle="Por favor, regresa Botón(Editar) y sube el video."
                        />
                      )}
                      <h4>Video Promocional</h4>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default FormEvents;
