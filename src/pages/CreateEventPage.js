import React from "react";
import { auth, db } from "../firebase";
import { Menu, Row, Col, Input, Image, Button, Card } from "antd";
import "../Styles/crearEvento.css";

import iconoEditar from "../images/editar.png";
import iconoEditar2 from "../images/editar.png";
import FormEvents from "../components/FormEvents";

function CreateEventPage(props) {
  const [infoUser, setInfoUser] = React.useState("");

  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe un usuario");

      const obtenerDatos = async () => {
        try {
          const data = await db.collection("infoUser").get(); //poner doc(user.email) escoje directo, usar solo usuario, usar ingles PONER
          //const data = await db.collection("infoUser").doc(user.email).get();

          const arrayDatos = await data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          //console.log(arrayDatos); //con esto almaceno el array de la informacion de los usuario

          const filtrado = arrayDatos.filter(
            (dato) => dato.uid === props.firebaseUser.uid
          ); //esto hago para solo coger el objeto con cohincida con los datos del usuario loggeado

          setInfoUser(filtrado[0]); //asigno el objeto al usuario
          //console.log(infoUser);
        } catch (error) {
          console.log(error);
        }
      };
      obtenerDatos();
    } else {
      console.log("no existe un usuario");
      //redirigir al usuario al login
      props.history.push("/ingresar");
    }
  }, [props.history, infoUser.uid]);

  return (
    <div>
      <div id="banner" style={{ backgroundImage: `url(${infoUser.banner})` }}>
        <h1>
          {" "}
          {infoUser.nombre} {infoUser.apellido}
        </h1>

        <Image
          id="imagenPrincipal"
          src={infoUser.foto}
          width={250}
          height={250}
          preview={false}
        />
        <Image
          className="editFoto"
          src={iconoEditar}
          width={50}
          height={50}
          preview={false}
        />
        <Image
          className="editFotoB"
          src={iconoEditar2}
          width={50}
          height={50}
          preview={false}
        />
      </div>

      <Row className="container">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="Bloque">
            <h1>Crear Eventos</h1>
          </div>

          <FormEvents />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="seccionBoton">
          <Button
            onClick={() => {
              console.log("ir a vista previa");
            }}
            className="botonReusable"
          >
            Vista Previa
          </Button>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="Bloque">
            <h1>Ver Eventos</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default CreateEventPage;
