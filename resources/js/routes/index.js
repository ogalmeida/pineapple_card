import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthContextProvider from '../context/auth';

import Invoice from '../pages/Invoice';
import Login from '../pages/Login';

const Routes = () => (

  <>
    <Switch>
        <Route path="/login" component={Login} />
        <AuthContextProvider>
            <Route path="/invoices" component={Invoice} />
        </AuthContextProvider>
    </Switch>
  </>
);

export default Routes;
