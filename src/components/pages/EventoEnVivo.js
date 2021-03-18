import { Button, Modal } from "antd";
import React, { useState } from "react";
import "../../css/EventoEnVivo.css";

export default function EventoEnVivo() {
  const [loading, setLoading] = useState("false");
  const [urlEvento, setUrlEvento] = useState(
    "https://www.youtube.com/embed/bgZHX_olZeI"
  );
  const [enterEvent, setEnterEvent] = useState(false);

  //funciones para manejar modal de donacion
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModalDonar = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //funciones para manejar modal de donacion
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModalGolden = () => {
    setIsModalVisible2(true);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  return (
    <div>
      <div className="blockEvento">
        <div className="videoBlock">
          {enterEvent ? (
            <div>
              <iframe
                width="100%"
                height="570px"
                src="https://www.youtube.com/embed/Rg3_vTMFc8I"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                       picture-in-picture"
                title="Evento en Vivo"
                showinfo="0"
                allowFullScreen
              ></iframe>
              <div className="btnBar">
                <Button className="btnEvent" onClick={showModalDonar}>
                  Donar
                </Button>
                <Modal
                  title="Donación Voluntaria"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>

                <Button className="btnEvent"
                onClick={showModalGolden}
                >Pase Gold</Button>
                 <Modal
                  title="Comprar Golden Pass"
                  visible={isModalVisible2}
                  onOk={handleOk2}
                  onCancel={handleCancel2}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
                <Button
                  className="btnEvent"
                  onClick={(event) => setEnterEvent(false)}
                >
                  Salir
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h1>Bienvenido al Evento</h1>
              <Button
                type="dashed"
                onClick={(event) => setEnterEvent(true)}
                className="btnIngresar"
              >
                Ingresar Evento
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
