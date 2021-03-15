import './css/App.css';
import React from "react";

//importo componentes para la navegacion
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink,
  Link
} from "react-router-dom";

//inserto las páginas del proyecto
import Contacto from './components/pages/Contacto';
import Inicio from './components/pages/Inicio';
import Eventos from './components/pages/Eventos';
import Ingresar from './components/pages/Ingresar';
import SingUp from './components/pages/SingUp';
import About from './components/pages/About';
import OthersProfile from './components/pages/OthersProfile';
import MyProfile from './components/pages/MyProfile';
import logo from './images/logo2ShowOriginalBlanco.png';
import Menu from '../src/components/Menu';
import CrearEvento from './components/pages/CrearEvento';
import CrearAnuncio from './components/pages/crearAnuncio';

import {Image} from 'antd';
import MainAdmin from './components/pages/PanelAdministracion/MainAdmin';

//importo auth
import {auth} from './components/firebase'

function App() {
  //usuario de la consola
  const [firebaseUser, setFirebaseUser] = React.useState(false) //va a partir en falso
//esta es una espera hasta que cargue el usuario
  React.useEffect(()=> {
    auth.onAuthStateChanged(user =>{
      //con esto puede conocer al usuario que esta en la sesion presente
      console.log(user)
      if(user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  },[])
  return firebaseUser !==false ? (
    <Router>
      <div className="container mt-3 ">
        <div className="btn-group mt-4 menu">
          <Menu firebaseUser={firebaseUser}/>
          
        </div>
       
        
        <Switch>
          <Router path="/contacto">
            <Contacto />
          </Router>
          <Router path="/about">
            <About />
          </Router>
          <Router path="/eventos">
            <Eventos />
          </Router>
          <Router path="/ingresar">
            <Ingresar />
          </Router>
          <Router path="/myprofile">
            <MyProfile firebaseUser={firebaseUser} />
          </Router>
          <Router path="/others">
            <OthersProfile />
          </Router>
          <Router path='/crearEvento'>
            <CrearEvento firebaseUser={firebaseUser}/>

          </Router>
          <Router path='/crearAnuncio'>
            <CrearAnuncio firebaseUser={firebaseUser}/>

          </Router>
          <Router path="/" exact='true'>
            <Inicio />
          </Router>
        </Switch>
      </div>
    </Router>
  ) : (
    <div>
      <p> Cargando...</p>
    
    </div>
  );
}
//el operador ternario va para lanzar cargando mientras se va cargando el usuario presente
export default App;


