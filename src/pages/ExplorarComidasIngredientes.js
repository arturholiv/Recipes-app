import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import requestSearchApi from '../services/requestSearchApi';

function ExplorarComidasIngredientes() {
  const MAX_MEALS_RENDER = 12;

  const location = useLocation();

  const [ingredients, setIngredients] = useState([]);
  const [render, setRender] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { setSearchRecipes } = useContext(AppContext);

  const getListOfIngredients = async () => {
    const ingredientsList = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((items) => items.json());
    setIngredients(ingredientsList.meals);
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
        render && ingredients.slice(0, MAX_MEALS_RENDER).map((ingredient, index) => (
          <button
            type="button"
            name={ ingredient.strIngredient }
            onClick={ showItensByIngredient }
            data-testid={ `${index}-ingredient-card` }
            key={ `${index}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              name={ ingredient.strIngredient }
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt={ ingredient.strIngredient }
            />
            <p
              data-testid={ `${index}-card-name` }
              name={ ingredient.strIngredient }
              key={ `${index}` }
            >
              {ingredient.strIngredient}

            </p>
          </button>
        ))
      }
      {redirect && <Redirect to="/comidas" /> }
      <Footer />
    </div>
  );
}

export default ExplorarComidasIngredientes;
