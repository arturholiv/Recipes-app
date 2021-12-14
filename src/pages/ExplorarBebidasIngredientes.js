import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import requestSearchApi from '../services/requestSearchApi';

function ExplorarBebidasIngredientes() {
  const MAX_DRINKS_RENDER = 12;

  const location = useLocation();

  const [ingredients, setIngredients] = useState([]);
  const [render, setRender] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { setSearchRecipes } = useContext(AppContext);

  const getListOfIngredients = async () => {
    const ingredientsList = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((items) => items.json());
    setIngredients(ingredientsList.drinks);
    setRender(true);
  };

  useEffect(() => { getListOfIngredients(); }, []);

  const showItensByIngredient = ({ target }) => {
    const inputValue = target.name;
    const ingredient = true;
    const name = false;
    const firstLetter = false;
    requestSearchApi({ inputValue, ingredient, name, firstLetter }, location.pathname)
      .then((results) => {
        if (results !== null) {
          return setSearchRecipes(results);
        }
        setSearchRecipes([]);
      });
    setRedirect(true);
  };

  return (
    <div>
      <Header />
      {
        render && ingredients.slice(0, MAX_DRINKS_RENDER).map((ingredient, index) => (
          <button
            type="button"
            name={ ingredient.strIngredient1 }
            onClick={ showItensByIngredient }
            data-testid={ `${index}-ingredient-card` }
            key={ `${index}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              name={ ingredient.strIngredient1 }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt={ ingredient.strIngredient1 }
            />
            <p
              data-testid={ `${index}-card-name` }
              name={ ingredient.strIngredient1 }
              key={ `${index}` }
            >
              {ingredient.strIngredient1}

            </p>
          </button>
        ))
      }
      {redirect && <Redirect to="/bebidas" /> }
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;
