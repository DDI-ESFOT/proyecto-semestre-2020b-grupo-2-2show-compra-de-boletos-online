import React from "react";
import "antd/dist/antd.css";
import "../Styles/App.css";
import "../Styles/menu.css";
import "../Styles/HomePage.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spin, Alert } from "antd";
import Routers from "../constants/routes";
import { auth } from "../firebase/index";

import MainLayout from "./MainLayout";
import EventPage from "../pages/EventsPage";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import IngregarPage from "../pages/IngresarPage";
import NotFoundPage from "../pages/NotFoundPage";
import MyProfilePage from "../pages/MyProfilePage";
import CreateEventPage from "../pages/CreateEventPage";

function App() {
  //usuario de la consola
  const [firebaseUser, setFirebaseUser] = React.useState(false); //va a partir en falso
  //esta es una espera hasta que cargue el usuario
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //con esto puede conocer al usuario que esta en la sesion presente
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);
  return firebaseUser !== false ? (
    <>
      <Router>
        <MainLayout>
          <Switch>
            <Route path={Routers.ABOUT}>
              <AboutPage />
            </Route>
            <Route path={Routers.EVENT}>
              <EventPage />
            </Route>
            <Route path={Routers.LOGIN}>
              <IngregarPage />
            </Route>
            <Router path={Routers.MYPROFILE}>
              <MyProfilePage firebaseUser={firebaseUser} />
            </Router>
            <Router path={Routers.CREATEEVENTS}>
              <CreateEventPage firebaseUser={firebaseUser} />
            </Router>
            <Route path={Routers.HOME} exact="true">
              <HomePage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </MainLayout>
      </Router>
    </>
  ) : (
    <div className="containerspidder">
      <Spin tip="Cargando ...">
        <Alert
          message="2Show"
          description="La mejor App de Strimmig."
          type="info"
        />
      </Spin>
    </div>
  );
}

export default App;
