import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React from 'react';
import Login from './pages/Login';
import Comidas from './pages/Comidas';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
      </Switch>
    </BrowserRouter>
  );
}
