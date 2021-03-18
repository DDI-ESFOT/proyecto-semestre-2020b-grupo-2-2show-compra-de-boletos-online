import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
import { db, auth } from "../firebase";
import ComprarEntrada from "./comprarEntrada";
import { UploadOutlined, HeartOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function Eventos() {
  //state del usuario vigente, el autenticado
  const [user, setUser] = React.useState(null);
  //esto es para que un usuario ingrese a MyProfile usando sus credenciales de acceso


  const [eventos, setEventos] = useState([]);


  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe un usuario");
      setUser(auth.currentUser); //toda la informacion del usuario autenticado
     
      const obtenerDatos = async () => {
        try {
          const data = await db.collection("eventos").get(); //poner doc(user.email) escoje directo, usar solo usuario, usar ingles PONER
          //const data = await db.collection("infoUser").doc(user.email).get();
          //console.log(data.docs)
          const arrayEventos = await data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          

          setEventos( await arrayEventos); //aqui tengo todos los eventos
          console.log('eventos',eventos); //con esto almaceno el array de la informacion de los usuario
          
        } catch (error) {
          console.log(error);
        }
      };
      obtenerDatos();
    } else {
      console.log("no existe un usuario");
      //redirigir al usuario al login
    }
  },[eventos]); //para que devuelva una sola vez se deja vacio

  

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
        
            
    


      </div>
      
    </div>
  );
}

/*revisar este codigo
{
            eventos.map(

                (event) => (
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title={event.nomEvento} description={event.fechaProgramada} />
                        
                    </Card>
                )
            ) 
        } */


/* 
        {
        
          eventos.map((evento) => {
            return (
              <Card
                key={evento.id}
                //className="postN"
                hoverable
                style={{ width: "80%" }}
                cover={<img alt="example" src={evento.bannerEvento} />}
              >
                <Meta
                  title={evento.fechaCreacion}
                  description={evento.descripEvento}
                />
                <p> Costo Entrada: {evento.costoEntrada}</p>
                <Button type="primary" onClick={showModal()}>
                  Comprar Entrada
                </Button>
                <Modal
                  title="Comprar Entrada"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
              </Card>
            );
          })}
*/