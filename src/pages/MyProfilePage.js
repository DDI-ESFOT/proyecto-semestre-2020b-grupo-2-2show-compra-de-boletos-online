import React , { useState } from "react";
import { auth, db } from "../components/Firebase";
import { withRouter } from "react-router";

import { Menu, Row, Col, Input, Image, Button, Card } from "antd";
import { CameraOutlined, UploadOutlined, EditOutlined,} from "@ant-design/icons";

import "../Styles/myProfile.css";

//importar iconos
import iconoEditar from "../images/editar.png";
import iconoEditar2 from "../images/editar.png";



function MyProfilePage(props){
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

                    const filtrado = arrayDatos.filter((dato) => dato.uid === props.firebaseUser.uid); //esto hago para solo coger el objeto con cohincida con los datos del usuario loggeado

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
        const obtenerPost = async () => {
            try {
                const posts = await db.collection("posts").get();
                const arrayPost =  posts.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const filteredListPost =  arrayPost.filter(
                    (dat) => dat.uidUser === props.firebaseUser.uid
                );
                setListaPost(filteredListPost);

                console.log("filtrada");
                console.log(listaPost);
                return;
            } catch (error) {}
        };
        obtenerPost();
    }, []);

    const { Meta } = Card;

    //funcion para subir el post
    const subirPost = async (e) => {
        try {
            const data = await db.collection("posts").add({
                textoPost: textoPost,
                imgPost: imgPost,
                fechaPost: Date.now(),
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

    return (
        <div>
            <div id="banner" style={{backgroundImage: `url(${infoUser.banner})`}}>
                <h1>{" "}
                    {infoUser.nombre} {infoUser.apellido}
                </h1>

                <Image
                    id="imagenPrincipal"
                    src={infoUser.foto}
                    width={250}
                    height={250}
                    preview={false}
                    className='img-circle'
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
                                    <CameraOutlined
                                        style={{ fontSize: "35px", color: "#fff" }}
                                        onClick={() => {
                                            console.log("aqui va la funcion para activar la camara");
                                        }}
                                    />
                                    <EditOutlined
                                        style={{ fontSize: "35px", color: "#fff" }}
                                        onClick={() => {
                                            console.log("aqui va la funcion para editar multimedia");
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

                        {
                            listaPost.map(
                                (post) => {
                                    return (
                                        <Card
                                            className="postN"
                                            hoverable
                                            style={{ width: "80%" }}
                                            cover={
                                                <img
                                                    alt="example"
                                                    src={post.imgPost}
                                                />
                                            }
                                        >
                                            <Meta title={post.fechaPost} description={post.textoPost} />
                                        </Card>
                                    )

                                }

                            )
                        }

                        <Card
                            className="postN"
                            hoverable
                            style={{ width: "80%" }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                />
                            }
                        >
                            <Meta title="2021-02-22" description="Un dia en la naturaleza" />
                        </Card>

                        <Card
                            className="postN"
                            hoverable
                            style={{ width: "80%" }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                />
                            }
                        >
                            <Meta title="2021-02-22" description="Un dia en la naturaleza" />
                        </Card>

                        <Card
                            className="postN"
                            hoverable
                            style={{ width: "80%" }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                />
                            }
                        >
                            <Meta title="2021-02-22" description="Un dia en la naturaleza" />
                        </Card>
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
                        <Button type="primary" href="/crearEvento" className="btn btn-dark">
                            Crear Evento
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