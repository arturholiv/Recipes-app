import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState('');

  const getPathByBtn = (pathByBtn) => {
    setPath(pathByBtn);
    setRedirect(true);
  };

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="explore-food"
          onClick={ () => getPathByBtn('explorar/comidas') }
          type="button"
        >
          Explorar Comidas

        </button>
        <button
          data-testid="explore-drinks"
          onClick={ () => getPathByBtn('explorar/bebidas') }
          type="button"
        >
          Explorar Bebidas

        </button>
      </div>
      {redirect && <Redirect to={ `/${path}` } /> }
      <Footer />
    </div>
  );
}

export default Explorar;
