import React, { useState } from "react";
import { auth, db } from "../firebase";
import { withRouter } from "react-router";
import "../Styles/myProfile.css";
//importo Ant para poder usar sus componentes
import { Row, Col, Input, Image, Button, Card } from "antd";

import Post from "../components/Post";

//importar iconos
import {
  UploadOutlined,
  EditOutlined,
  HeartOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import { NavLink } from "react-router-dom";

function MyProfilePage(props) {
  //state del usuario vigente, el autenticado
  const [user, setUser] = React.useState(null);
  //esto es para que un usuario ingrese a MyProfile usando sus credenciales de acceso

  //usuario para subir la informacion
  const [infoUser, setInfoUser] = useState("");
  //estado para subir informacion de los post
  const [textoPost, setTextoPost] = useState("");
  const [imgPost, setImgPost] = useState("");
  const [videoPost, setVideoPost] = useState("");
  //lista de posts
  const [listaPost, setListaPost] = useState([]); ///es un arreglo , iniciar asi
  const [likesPost, setLikesPost] = useState(0);

  //funcion para obtener los datos de la base de datos
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe un usuario");
      setUser(auth.currentUser); //toda la informacion del usuario autenticado
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
  }, [props.history, user, infoUser.uid]); //para que devuelva una sola vez se deja vacio
  //si pongo listaPost se va un loop infinito 2021-marzo-10

  React.useEffect(() => {
    //cargo la coleccion de posts
    console.log("uid", props.firebaseUser.uid);
    const obtenerPost = () => {
      try {
        db.collection("posts")
          .where("uidUser", "==", props.firebaseUser.uid)
          .onSnapshot((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
              posts.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            console.log("Current POSTS: ", posts.join(", "));
            setListaPost(posts);
          });
      } catch (error) {}
    };
    obtenerPost();
  }, []);

  const { Meta } = Card;

  //funcion para subir el post
  const subirPost = async (e) => {
    try {
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      const data = await db.collection("posts").add({
        textoPost: textoPost,
        imgPost: imgPost,
        fechaPost: hoy.toDateString(),
        videoPost: videoPost,
        likesPost: 0,
        uidUser: infoUser.uid,
      });
      setImgPost("");
      setVideoPost("");
      setTextoPost("");
      console.log("post sent");
    } catch (error) {
      console.log("no se pudo subir el post!");
    }
  };

  //validacion y proceso para subir post a la base de datos
  const procesarDatos = (e) => {
    e.preventDefault();
    if (!textoPost.trim()) {
      console.log("Post Vacio");

      return;
    }
    subirPost();

    //aqui vamos a registrar al nuevo usuario en firebase
  };

  const handleLike = async (postId, likes) => {
    //setLikesPost(post.likesPost + 1)

    console.log("click", postId, likes);
    await db
      .collection("posts")
      .doc(postId)
      .update({
        likesPost: likes + 1,
      });
    //guardar base de datos
    //
  };

  return (
    <div>
      <div
        id="banner"
        style={{
          backgroundImage: `url(${infoUser.banner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
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
          className="img-circle"
        />
        <div className="editFoto">
          <FormOutlined style={{ fontSize: "30x", color: "red" }} />
        </div>
        <div className="editFotoB">
          <EditOutlined style={{ fontSize: "25px", color: "red" }} />
        </div>
      </div>

      <Row id="contenido">
        <Col className="BloqueI" xs={24} sm={24} md={7} lg={7} xl={7}>
          <div className="Bloque">
            <h1>Informacion Personal</h1>
          </div>

          <div className="informacionBloque">
            <div className="informacion">
              <h2 className="item">
                <b>Nombre:</b> {infoUser.nombre} {infoUser.apellido}
              </h2>
              <h2 className="item">
                <b>Edad:</b> 26 años
              </h2>
              <h2 className="item">
                <b>País:</b> {infoUser.pais}
              </h2>
              <h2 className="item">
                <b>Ciudad:</b> {infoUser.ciudad}
              </h2>

              <div className="seguidoresBloque">
                <Button className="botonBloque">Seguidores</Button>
                <p> {infoUser.numFollowers}</p>
              </div>
            </div>
          </div>
        </Col>

        <Col className="BloqueIII" xs={24} sm={24} md={24} lg={10} xl={8}>
          <div id="postBloque">
            <div id="post">
              <form onSubmit={procesarDatos}>
                <Input
                  id="inputPost"
                  placeholder="¿Qué piensas?..."
                  size="large"
                  onChange={(e) => setTextoPost(e.target.value)}
                  value={textoPost}
                />
                <div id="iconos">
                  <UploadOutlined
                    style={{ fontSize: "35px", color: "#fff" }}
                    onClick={() => {
                      console.log("aqui va la funcion para subir multimedia");
                    }}
                  />

                  <button id="btnPostear" type="submit">
                    Postear
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div id="viewPost">
            {listaPost.map((post) => {
              return (
                <Card
                  key={post.id}
                  className="postN"
                  hoverable
                  style={{ width: "80%" }}
                  cover={<img alt="example" src={post.imgPost} />}
                >
                  <Meta title={post.fechaPost} description={post.textoPost} />
                  <p>Likes {post.likesPost}</p>
                  <HeartOutlined
                    onClick={() => handleLike(post.id, post.likesPost)}
                  />
                </Card>
              );
            })}
          </div>
        </Col>

        <Col className="BloqueII" xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="Bloque">
            <h1>Tus Eventos</h1>
          </div>

          <div className="eventoBloque">
            <div className="Evento">
              <div>
                <p>
                  {" "}
                  <b>Shakira </b> Sábado 9 pm{" "}
                </p>
              </div>
              <Button className="botonReservar">Ingresar</Button>
            </div>
          </div>

          <div className="Bloque">
            <h1>Próximos Eventos</h1>
          </div>
          <div className="eventoBloque">
            <div className="Evento">
              <div>
                <p>
                  {" "}
                  <b>Widinson </b> 3 de Octubre 9 pm{" "}
                </p>
              </div>
              <Button className="botonReservar">Reservar</Button>
            </div>
            <Button
              type="primary"
              href="/crearEvento"
              className="botonReusable"
            >
              <NavLink to={Routes.CREATEEVENTS}>Crear evento</NavLink>
            </Button>
          </div>
          <div className="eventoBloque">
            <div className="Evento">
              <div>
                <p>
                  {" "}
                  <b>Maná </b> 10 de Octubre 9 pm{" "}
                </p>
              </div>
              <Button className="botonReservar">Reservar</Button>
            </div>
          </div>

          <div className="Bloque">
            <h1>Anuncios</h1>
          </div>
        </Col>
      </Row>
      <div></div>
    </div>
  );
}
export default withRouter(MyProfilePage);
