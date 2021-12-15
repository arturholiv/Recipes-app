import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState('');

  const getPathByBtn = (pathByBtn) => {
    setPath(pathByBtn);
    setRedirect(true);
  };

  const generateRandomDrink = async () => {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((items) => items.json());
    const { idDrink } = drinks[0];
    getPathByBtn(`bebidas/${idDrink}`);
  };

  return (
    <div>
      <Header />
      <button
        data-testid="explore-by-ingredient"
        onClick={ () => getPathByBtn('explorar/bebidas/ingredientes') }
        type="button"
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-surprise"
        onClick={ generateRandomDrink }
        type="button"
      >
        Me Surpreenda!
      </button>
      {redirect && <Redirect to={ `/${path}` } /> }
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
