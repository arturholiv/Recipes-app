import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React from 'react';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ComidasEmProgresso from './pages/ComidasEmProgresso';
import BebidasEmProgresso from './pages/BebidasEmProgresso';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidaArea from './pages/ExplorarComidaArea';
import DetalhesComidas from './pages/DetalhesComidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import NotFound from './pages/NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ DetalhesComidas } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
        <Route exact path="/comidas/:id/in-progress" component={ ComidasEmProgresso } />
        <Route exact path="/bebidas/:id/in-progress" component={ BebidasEmProgresso } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidaArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
