import React from "react";
import { withRouter } from "react-router-dom";
import { auth, db } from "../firebase";

//importo el datapicker
import { Form, Input, DatePicker, Space } from "antd";
import Routers from "../constants/routes";

function IngresarPage(props) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("initialState");
  const [error, setError] = React.useState(null);
  const [esRegistro, setEsRegistro] = React.useState(false);
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [ciudad, setCiudad] = React.useState("");
  const [pais, setPais] = React.useState("");
  const [cuenta, setCuenta] = React.useState("");

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  //funcion para hacer login
  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);
      setEmail("");
      setPass("");
      setError(null);
      //esta funcion me lleva al perfil personal del usuario
      props.history.push(Routers.MYPROFILE);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("email incorrecto!");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado!");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta!");
      }
    }
  }, [email, pass, props.history]); //necesito poner los estados que voy a ocupar en el callback
  //no olvidar poner el props.history

  //usamos un callback
  //para llamar a la funcion para crear usuario en firebase
  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      console.log(res);
      console.log("Pasó todas las validaciones!");
      //crea una coleccion nueva dentro de Usuarios
      await db.collection("Usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection("infoUser").doc(res.user.email).set({
        nombre: nombre,
        apellido: apellido,
        ciudad: ciudad,
        pais: pais,
        cuenta: cuenta,
        uid: res.user.uid,
        foto: "https://pixabay.com/images/id-973460/",
        email: res.user.email,
        categoria: "",
        numFollowers: 0,
        banner:
          "https://image.freepik.com/foto-gratis/hipster-boy-tocando-guitarra-su-novia-encima-estilo-retro_8595-5221.jpg",
        cumple: "",
      });

      //resetea los estados
      setEmail("");
      setPass("");
      setError(null);
      //esta funcion me lleva al perfil personal del usuario
      props.history.push(Routers.MYPROFILE);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("email no válido!");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("El email ya está registrado");
      }
    }
  }, [email, pass, props.history, nombre, apellido, ciudad, pais, cuenta]); //necesito poner los estados que voy a ocupar en el callback
  //no olvidar poner el props.history

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      console.log("Ingrese Email");
      setError("Ingrese Email");
      return;
    }
    if (!pass.trim()) {
      console.log("Ingrese Contraseña");
      setError("Ingrese Contraseña");
      return;
    }
    if (pass.length < 6) {
      console.log("Password mayor a 6 caracteres");
      setError("Password mayor a 6 caracteres");
      return;
    }
    setError(null);

    //aqui vamos a registrar al nuevo usuario en firebase
    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="titulologin">
        {esRegistro ? "Registrar Usuario" : "Ingresar"}
      </h3>
      <hr></hr>
      <form onSubmit={procesarDatos}>
        {error && <div className="alertlogin">{error}</div>}
        <Form.Item
          label="Username"
          name="Email"
          rules={[{ required: true, message: "Por favor ingrese su email!" }]}
        >
          <Input
            type="email"
            class="form-control mb-2"
            placeholder="Ingrese su email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su contraseña!",
            },
          ]}
        >
          <Input.Password
            class="form-control mb-2"
            placeholder="Ingrese su contraseña"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
        </Form.Item>

        {esRegistro ? (
          <div>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                type="text"
                class="form-control mb-2"
                placeholder="Escriba su Nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
              />
            </Form.Item>

            <Form.Item
              label="Apellido"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                type="text"
                class="form-control mb-2"
                placeholder="Escriba su Apellido"
                onChange={(e) => setApellido(e.target.value)}
                value={apellido}
              />
            </Form.Item>

            <Form.Item
              label="Ciudad"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                type="text"
                class="form-control mb-2"
                placeholder="Ciudad de Residencia"
                onChange={(e) => setCiudad(e.target.value)}
                value={ciudad}
              />
            </Form.Item>

            <Form.Item
              label="País"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                type="text"
                class="form-control mb-2"
                placeholder="Pais de Origen"
                onChange={(e) => setPais(e.target.value)}
                value={pais}
              />
            </Form.Item>

            <h3>Tipo de Cuenta</h3>
            <form>
              <input
                type="radio"
                id="artista"
                value={cuenta}
                name="artista"
                onChange={(e) => {
                  setCuenta("ART");
                  console.log("ART");
                }}
              />
              <label for="artista">Artista</label>
              <br></br>
              <input
                type="radio"
                id="usuario"
                value={cuenta}
                name="usuario"
                onChange={(e) => {
                  setCuenta("USR");
                  console.log("USR");
                }}
              />
              <label for="usuario">Usuario Normal</label>
            </form>
            <h3>Escriba la fecha de su nacimiento</h3>
            <Space direction="vertical">
              <DatePicker onChange={onChange} type="date" />
            </Space>
          </div>
        ) : null}

        <button type="submit" className="ant-btn ant-btn-lg">
          {esRegistro ? "Registrar Usuario" : "Ingresar"}
        </button>
        <br></br>
        <button
          type="button"
          className="ant-btn ant-btn-lg"
          onClick={() => setEsRegistro(!esRegistro)}
        >
          {esRegistro ? "¿Ya estas registrado?" : "¿No tienes cuenta?"}
        </button>
      </form>
    </div>
  );
}

export default withRouter(IngresarPage);
