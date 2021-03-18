import React from "react";
import { Menu, Row, Col, Input, Image, Button, Card } from "antd";

function Fondo(props) {
  function fullName(person) {
    return `${person.name} ${person.lastName}`;
  }
  const { Meta } = Card;

  return (
    <>
      <div id="banner">
        <h1 n> {fullName(props.person)}</h1>
        <Image
          id="imagenPrincipal"
          src="../img/logo2ShowOriginal.png"
          width={300}
          height={300}
        />
        <Image
          className="edit"
          src="../img/editar.png"
          width={50}
          height={50}
        />
        <Image
          className="edit"
          src="../img/editar.png"
          width={50}
          height={50}
        />
      </div>
      <Row id="content" gutter={[16, 16]}>
        <Col className="BloqueI" xs={24} sm={24} md={7} lg={7} xl={7}>
          <div className="Bloque">
            <h1>Informacion Personal</h1>
          </div>

          <div className="informacionBloque">
            <div className="informacion">
              <h2 className="item">
                <b>Nombre:</b> Kevin Morales
              </h2>
              <h2 className="item">
                <b>Edad:</b> 26 años
              </h2>
              <h2 className="item">
                <b>País:</b> Ecuador
              </h2>
              <h2 className="item">
                <b>Ciudad:</b> Quito
              </h2>

              <div className="seguidoresBloque">
                <Button className="botonBloque">Seguidores</Button>
                <p> 20k</p>
              </div>
            </div>
          </div>
        </Col>

        <Col className="BloqueIII" xs={24} sm={24} md={24} lg={8} xl={8}>
          <div id="postBloque">
            <div id="post">
              <Input
                id="inputPost"
                placeholder="¿Qué piensas?..."
                size="large"
              />
              <Image
                className="edit"
                src="../img/editar.png"
                width={25}
                height={25}
              />
              <Image
                className="edit"
                src="../img/editar.png"
                width={25}
                height={25}
              />
              <Image
                className="edit"
                src="../img/editar.png"
                width={25}
                height={25}
              />
              <Button id="btnPostear">Postear</Button>
            </div>
          </div>
          <div id="viewPost">
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
    </>
  );
}
export default Fondo;
