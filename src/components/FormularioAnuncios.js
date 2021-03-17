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
} from "antd";
import { db, auth, storage } from "./firebase";

import { UploadOutlined } from "@ant-design/icons";

const FormularioAnuncios = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false)

  //states de los campos a ingresar en el formulario
  const [bannerEvento, setBannerEvento] = useState("");
  const [costoDonacion, setCostoDonacion] = useState("");
  const [costoEntrada, setCostoEntrada] = useState("");
  const [costoGolden, setCostoGolden] = useState("");
  const [descripEvento, setDescripEvento] = useState("");
  const [entradasDisp, setEntradasDisp] = useState("");
  const [fechaProgramada, setFechaProgramada] = useState('');
  const [horaProgramada, setHoraProgramada] = useState('');
  const [goldenDisp, setGoldenDisp] = useState("");
  const [nomEvento, setNomEvento] = useState("");
  const [urlEvento, setUrlEvento] = useState("");
  const [videoEvento, setVideoEvento] = useState("");
  const [nomPremio, setNomPremio] = useState("");
  const [descripPremio, setDescripPremio] = useState("");
  const [imgPremio, setImgPremio] = useState("");

  //funcion para subir el evento a la base de datos

 

  const registrar = async (data) => {


    const snapshotBanner = await storage.ref(`imgBannerEvento/${data.uploadImgEvento.name}`).put(data.uploadImgEvento);
    const bannerURL = await snapshotBanner.ref.getDownloadURL();
    const snapshotVideo = await storage.ref(`videoBannerEvento/${data.uploadVideoEvento.name}`).put(data.uploadVideoEvento);
    const videoURL = await snapshotVideo.ref.getDownloadURL();
    const snapshotImgPremio = await storage.ref(`imgPremio/${data.uploadImgPremio.name}`).put(data.uploadImgPremio);
    const imgPremioURL = await snapshotImgPremio.ref.getDownloadURL();
    
    console.log('URL de premio',imgPremioURL);

     setBannerEvento( await bannerURL);
     console.log('BANNER',bannerEvento);
     setFechaProgramada(await data.fechaEvento);
     console.log('fecha', fechaProgramada._d);
     setHoraProgramada( await data.horaEvento);
     console.log('hora', horaProgramada);
     setImgPremio( imgPremioURL);
    setVideoEvento( videoURL);
    
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
      fechaProgramada: fechaProgramada._d,
     

      //creacion del evento
      fechaCreacion: hoy,
      nomPremio: nomPremio,
      descripPremio: descripPremio,
     imgPremio: imgPremio,
      uidGanador: '',
      imgGanador: '',
      nomGanador: "",
    });

    


     
  };

  const onFinish = async (data) => {
    setLoading(true);
    console.log('valores',data)
    console.log(data.fechaEvento)
   await registrar(
      {...data, uploadImgEvento: data.uploadImgEvento[0].originFileObj,
      uploadVideoEvento: data.uploadVideoEvento[0].originFileObj,
    uploadImgPremio: data.uploadImgPremio[0].originFileObj,}
    );
    setLoading(false);
    alert('Evento Creado!');
    
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  return (
    <>
      <h1>Llene el siguiente formulario para crear su Anuncio</h1>

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
        <Form.Item label="Nombre del Evento" required
        name="nomEvento"
        >
          <Input
            onChange={(e) => setNomEvento(e.target.value)}
            value={nomEvento}
          />
        </Form.Item>
        <Form.Item label="Descripción del Evento" required
        name="descripEvento"
        >
          <Input.TextArea
            onChange={(e) => setDescripEvento(e.target.value)}
            value={descripEvento}
          />
        </Form.Item>

        <Form.Item label="Hora del Evento"
        name="horaEvento"
        >
          <TimePicker />
        </Form.Item>
        <Form.Item label="Fecha del Evento"
        name="fechaEvento"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Tickets disponibles" required
        name="entradasDisp"
        >
          <Input
            onChange={(e) => setEntradasDisp(e.target.value)}
            value={entradasDisp}
          />
        </Form.Item>
        <Form.Item label="Costo Ticket" required
        name="costoEntrada"
        >
          <Input
            onChange={(e) => setCostoEntrada(e.target.value)}
            value={costoEntrada}
          />
        </Form.Item>

        <Form.Item label="Pases Gold Disponibles"
        name="goldenDisp"
        >
          <Input
            onChange={(e) => setGoldenDisp(e.target.value)}
            value={goldenDisp}
          />
        </Form.Item>
        <Form.Item label="Costo Pase Gold" required
        name="costoGolden"
        >
          <Input
            onChange={(e) => setCostoGolden(e.target.value)}
            value={costoGolden}
          />
        </Form.Item>
        <Form.Item label="Costo Donación Mínima"
        name="costoDonacion"
        >
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
          <Upload name="imgEvento" action={null} listType="picture">
            <Button icon={<UploadOutlined />}>Click para subir</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="uploadVideoEvento"
          label="Video del Evento"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="videoEvento" action={null} listType="picture">
            <Button icon={<UploadOutlined />}>Click para subir</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="url del Evento" required
        name="urlEvento"
        >
          <Input
            onChange={(e) => setUrlEvento(e.target.value)}
            value={urlEvento}
          />
        </Form.Item>

        <h2>Escriba la informacion del Premio a Sortear</h2>
        <Form.Item label="Nombre del Premio" required
        name="nomPremio"
        >
          <Input
            onChange={(e) => setNomPremio(e.target.value)}
            value={nomPremio}
          />
        </Form.Item>
        <Form.Item label="Descripción del Premio" required
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

        <Form.Item>
          <Button type="primary" htmlType="submit"
          loading={loading}
          >
            Crear Evento
          </Button>
        </Form.Item>
      </Form>
      <br></br>
      <Button
        onClick={() => {
          console.log("ir a vista previa");
        }}
        className="botonReusable"
      >
        Vista Previa
      </Button>
    </>
  );
};

export default FormularioAnuncios;


/*
const procesarDatos = (e) => {
    //validaciones

    if (!nomEvento.trim()) {
      alert("Ingrese el nombre del evento");
      return;
    }
    if (!descripEvento.trim()) {
      alert("Ingrese la descripcion del Evento");
      return;
    }
    if (!entradasDisp.trim()) {
      alert("Ingrese el valor numérico de la cantidad de entradas");
      return;
    }
    if (!costoEntrada.trim()) {
      alert("Ingrese el valor numérico del costo de la entrada");
      return;
    }
    if (!costoDonacion.trim()) {
      alert("Ingrese el valor numérico del costo de donación");
      return;
    }
    if (!goldenDisp.trim()) {
      alert(
        "Ingrese el valor numérico de la cantidad de pases Golden Disponibles"
      );
      return;
    }
    if (!urlEvento.trim()) {
      alert("Ingrese la url del Evento");
      return;
    }
    if (!is_numeric(entradasDisp)) {
      alert("Ingrese un valor NUMÉRICO en Tickets disponibles");
      return;
    }
    if (!is_numeric(goldenDisp)) {
      alert("Ingrese un valor NUMÉRICO en Pases Gold Disponibles");
      return;
    }
    if (!is_numeric(costoEntrada)) {
      alert("Ingrese un valor NUMÉRICO en Pases Gold Disponibles");
      return;
    }
    if (!is_numeric(costoGolden)) {
      alert("Ingrese un valor NUMÉRICO en Pases Gold Disponibles");
      return;
    }
    if (!nomPremio.trim()) {
      alert("Ingrese el nombre del Premio");
      return;
    }
    if (!descripPremio.trim()) {
      alert("Ingrese la descripcion del Premio");
      return;
    }

    subirEvento();
  };
*/