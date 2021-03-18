import React from "react";
import {auth} from "./Firebase";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import ShowHeader from "./MainMenu";
import ShowAbout from "./home/About";
import ShowEvent from "../pages/EventsPage";

function ShowRouter(){
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
                    <ShowHeader firebaseUser={firebaseUser}/>

                </div>


                <Switch>

                    <Router path="/about">
                        <ShowAbout />
                    </Router>
                    <Router path="/event">
                        <ShowEvent />
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
export default ShowRouter;