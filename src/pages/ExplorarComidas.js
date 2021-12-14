import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidas() {
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState('');

  const getPathByBtn = (pathByBtn) => {
    setPath(pathByBtn);
    setRedirect(true);
  };

  const generateRandomFood = async () => {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((items) => items.json());
    const { idMeal } = meals[0];
    getPathByBtn(`comidas/${idMeal}`);
  };

  return (
    <div>
      <Header />
      <button
        data-testid="explore-by-ingredient"
        onClick={ () => getPathByBtn('explorar/comidas/ingredientes') }
        type="button"
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-by-area"
        onClick={ () => getPathByBtn('explorar/comidas/area') }
        type="button"
      >
        Por Local de Origem
      </button>
      <button
        data-testid="explore-surprise"
        onClick={ generateRandomFood }
        type="button"
      >
        Me Surpreenda!
      </button>
      {redirect && <Redirect to={ `/${path}` } /> }
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
