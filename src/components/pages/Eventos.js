import React, { useState } from "react";
import { Card, } from "antd";
import { db,  } from "../firebase";
import ComprarEntrada from "./comprarEntrada";


const { Meta } = Card;

export default function Eventos() {
  //state del usuario vigente, el autenticado
 
  //esto es para que un usuario ingrese a MyProfile usando sus credenciales de acceso

  const [eventos, setEventos] = useState([
    {
      nomEvento: "Medardo y sus Players",
      fechaProgramada: "2021 Abril 18 20:00",
      bannerEvento:
        "https://i.pinimg.com/564x/97/c1/6d/97c16d195994553453f3c72098b0ccb4.jpg",
    },
    {
      nomEvento: "Shakira",
      fechaProgramada: "2021 Mayo 5 20:00",
      bannerEvento:
        "https://i.pinimg.com/564x/97/c1/6d/97c16d195994553453f3c72098b0ccb4.jpg",
    },
  ]);

  const [listaEventos, setListaEventos] = useState('');

  React.useEffect(() => {
    //cargo la coleccion de posts
    const obtenerEventos = async() => {
      try {
       await db.collection("eventos")
          .onSnapshot((querySnapshot) => {
            const eventList = [];
            querySnapshot.forEach((doc) => {
              eventList.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            console.log("Current EVENTS: ", eventList.join(", "));
            setListaEventos(eventList);
            console.log(listaEventos)
          });
      } catch (error) {}
    };
    obtenerEventos();
  }, []);





  //esta parte es para el modal de compra de evento
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2> Eventos Disponibles</h2>
      <div>
      
        <div styles={'display: inline-flex'}>
          {eventos.map((event) => {
            return (
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={event.bannerEvento}
                  />
                }
              >
                <Meta
                  title={event.nomEvento}
                  description={event.fechaProgramada}
                />
                  <ComprarEntrada evento={event} />
              </Card>
            );
          })}
        </div>
        <h1>Esta es una prueba con la lista de firebase</h1>
        <div >
        {
          listaEventos.map((event) => {
            return (
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={event.bannerEvento}
                  />
                }
              >
                <Meta
                  title={event.nomEvento}
                  description='proximamente'
                />
                  <ComprarEntrada event={event} />
              </Card>
            )
          }
          )
          
          }
        </div>
      </div>
    </div>
  );
}

