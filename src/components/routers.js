import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from "../pages/Dashboard";

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"  />
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;