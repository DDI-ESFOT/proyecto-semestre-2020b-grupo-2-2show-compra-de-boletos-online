import React from 'react';
import {Route, Switch} from 'react-router-dom';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path={ Routes.HOME }>
                <Home />
            </Route>

            <Route exact path={ Routes.LOGIN }>
                <Login />
            </Route>

            <Route exact path={ Routes.REGISTER }>
                <Register />
            </Route>
            <Route path={ Routes.SERVICES }>
                <Services />
            </Route>
            <Route path={ Routes.ABOUT }>
                <About />
            </Route>

            <Route component={ NotFound } />
        </Switch>
    );
};

export default AppRouter;