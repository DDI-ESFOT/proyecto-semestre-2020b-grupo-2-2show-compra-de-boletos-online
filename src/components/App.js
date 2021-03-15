import React from "react";
import 'antd/dist/antd.css';
import '../Styles/App.css';
import '../Styles/menu.css';
import '../Styles/HomePage.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainLayout from "./MainLayout";
import EventPage from "../pages/EventsPage";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import IngregarPage from "../pages/IngresarPage";

function App() {
    return (
        <>
            <Router>
                <MainLayout >
                    <Switch>
                        <Route path="/about">
                            <AboutPage/>
                        </Route>
                        <Route path="/event">
                            <EventPage/>
                        </Route>
                        <Route path="/login">
                            <IngregarPage/>
                        </Route>
                        <Route path="/">
                            <HomePage/>
                        </Route>
                    </Switch>
                </MainLayout>
            </Router>
        </>
    );
}

export default App;
