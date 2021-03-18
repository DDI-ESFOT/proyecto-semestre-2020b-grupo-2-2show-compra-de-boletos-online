import React, { useState } from "react";
import { Modal, Button } from "antd";
import EventoEnVivo from "./EventoEnVivo";
import '../../css/comprarEntrada.css'
import {db, auth} from '../firebase'

export default function ComprarEntrada() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const evento = {
      nomEvento: 'Shakira en Vivo',
      costoEntrada: 40,
      descripEvento: 'Este evento digital se transmite desde Colombia para el mundo, disfruta de un momento placentero y agradable',
      urlEvento: 'https://www.youtube.com/embed/DnGdoEa1tPg',
      fechaEvento: '2021 Marzo 31 20:00'
  }
  const generarCompra = async () => {
    setUser(auth.currentUser);
    console.log(user.uid)
    setLoading(true);
    await db.collection("eventosPagados").add({
        nomEvento: evento.nomEvento,
        costoEntrada: evento.costoEntrada,
        descripEvento: evento.descripEvento,
        urlEvento: evento.urlEvento,
       uid: user.uid,
       fechaEvento: evento.fechaEvento,

    });
    setLoading(false);
    console.log('evento agregado con exito!!');


  }
  




  return (
    <div>
      
      <Button type="primary" onClick={showModal}>
        Comprar Entrada
      </Button>
      <Modal
        title="Comprar Entrada"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      
        onOK={generarCompra}
        
      >
        <div>
            <h2>Evento </h2>
            <p>{evento.nomEvento}</p>
            <h2>Costo Evento </h2>
            <p>{evento.costoEntrada}</p>
            <h2>Descripción</h2>
            <p>{evento.descripEvento}</p>
            <Button
            onClick={generarCompra}
            loading={loading}>
                Comprar
            </Button>
            
        </div>
      </Modal>
    </div>
  );
}
