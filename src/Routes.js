import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React from 'react';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ Comidas } />
        <Route exact path="/bebidas/:id" component={ Bebidas } />
      </Switch>
    </BrowserRouter>
  );
}
