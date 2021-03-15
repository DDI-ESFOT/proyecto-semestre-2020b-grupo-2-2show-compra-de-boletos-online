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
import { db,auth } from "./firebase";

import { UploadOutlined } from "@ant-design/icons";

const FormularioEventos = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [user, setUser] = React.useState(null);
 

  //states de los campos a ingresar en el formulario
  const [bannerEvento, setBannerEvento] = useState("");
  const [costoDonacion, setCostoDonacion] = useState("");
  const [costoEntrada, setCostoEntrada] = useState("");
  const [costoGolden, setCostoGolden] = useState("");
  const [descripEvento, setDescripEvento] = useState("");
  const [entradasDisp, setEntradasDisp] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [fechaProgramada, setFechaProgramada] = useState("");
  const [horaProgramada, setHoraProgramada] = useState("");
  const [goldenDisp, setGoldenDisp] = useState("");
  const [nomEvento, setNomEvento] = useState("");
  const [urlEvento, setUrlEvento] = useState("");
  const [videoEvento, setVideoEvento] = useState("");

  //funcion para subir el evento a la base de datos

  const subirEvento = async (e) => {
    try {
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
    
      const data = await db.collection("eventos").add({
        nomEvento: nomEvento,
        entradasDisp: entradasDisp,
        costoEntrada: costoEntrada,
        costoDonacion: costoDonacion,
        urlEvento: urlEvento,
        costoGolden: costoGolden,
        goldenDisp: goldenDisp,
        bannerEvento: "",
        videoEvento: "",
        uid:props.infoUser.uid, 

        //creacion del evento
        fechaCreacion: hoy.toDateString(),
      });
      setNomEvento("");
      setEntradasDisp("");
      setCostoEntrada("");
      setCostoDonacion("");
      setUrlEvento("");
      setCostoGolden("");
      setGoldenDisp("");
      setBannerEvento("");
      setVideoEvento("");
      alert('Evento creado!')
      //limpiar estados
    } catch (error) {
      console.log("no se pudo subir el evento!");
    }
  };

  function is_numeric(value) {
    if(value < 0) {
      alert('El formulario contiene valores negativos no permitidos!');
      return
    }
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  const procesarDatos = (e) => {
    //validaciones

    if (!nomEvento.trim()) {
   
      alert("Ingrese el nombre del evento");
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

    subirEvento();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(nomEvento);
    console.log(urlEvento);
    procesarDatos();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1>Llene el siguiente formulario para crear su evento</h1>

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
        <Form.Item label="Nombre del Evento" required>
          <Input
            onChange={(e) => setNomEvento(e.target.value)}
            value={nomEvento}
          />
        </Form.Item>
        <Form.Item label="Hora del Evento">
          <TimePicker />
        </Form.Item>
        <Form.Item label="Fecha del Evento">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Tickets disponibles" required>
          <Input
            onChange={(e) => setEntradasDisp(e.target.value)}
            value={entradasDisp}
          />
        </Form.Item>
        <Form.Item label="Costo Ticket" required>
          <Input
            onChange={(e) => setCostoEntrada(e.target.value)}
            value={costoEntrada}
          />
        </Form.Item>

        <Form.Item label="Pases Gold Disponibles">
          <Input
            onChange={(e) => setGoldenDisp(e.target.value)}
            value={goldenDisp}
          />
        </Form.Item>
        <Form.Item label="Costo Pase Gold" required>
          <Input
            onChange={(e) => setCostoGolden(e.target.value)}
            value={costoGolden}
          />
        </Form.Item>
        <Form.Item label="Costo Donación Mínima">
          <Input
            onChange={(e) => setCostoDonacion(e.target.value)}
            value={costoDonacion}
          />
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
        <Form.Item label="url del Evento" required>
          <Input
            onChange={(e) => setUrlEvento(e.target.value)}
            value={urlEvento}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
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

export default FormularioEventos;
