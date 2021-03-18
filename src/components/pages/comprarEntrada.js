import React, { useState } from "react";
import { Modal, Button } from "antd";
import EventoEnVivo from "./EventoEnVivo";
import '../../css/comprarEntrada.css'
import {db, auth} from '../firebase'

export default function ComprarEntrada(props) {
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
      nomEvento: 'Juanes en Vivo',
      costoEntrada: 50,
      descripEvento: 'Este evento digital se transmite desde Ecuador para el mundo, disfruta de un momento placentero y agradable',
      urlEvento: 'https://www.youtube.com/embed/DnGdoEa1tPg',
      fechaEvento: '2021 Abril 28 20:00'
  }

  const generarCompra = async () => {
    setUser(auth.currentUser);
    console.log(user.uid)
    setLoading(true);
    await db.collection("eventosPagados").add({
        nomEvento: props.event.nomEvento,
        costoEntrada: props.event.costoEntrada,
        descripEvento: props.event.descripEvento,
        urlEvento: props.event.urlEvento,
       uid: user.id,
       fechaEvento: props.event.fechaProgramada,

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
            <p>{props.event.nomEvento}</p>
            <h2>Costo Evento </h2>
            <p>{props.event.costoEntrada}</p>
            <h2>Descripción</h2>
            <p>{props.event.descripEvento}</p>
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
