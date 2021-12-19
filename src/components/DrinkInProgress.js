import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import IngredientsDrinkInProgress from './IngredientsDrinkInProgress';
import AppContext from '../context/AppContext';

function DrinkInProgress({ drinkInProgress }) {
  console.log(drinkInProgress);
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const { btnFinalizeRecipe, incrementDoneRecipes } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    if (drinkInProgress) {
      const NUMBER_OF_INGREDIENTS = Object.keys(drinkInProgress[0])
        .filter((key) => key.includes('strIngredient')).length;
      setNumberOfIngredients(NUMBER_OF_INGREDIENTS);
    }
  }, [drinkInProgress]);
  return (
    <div>
      <h1>Drink In progress</h1>
      {drinkInProgress && drinkInProgress.map((drink) => (
        <div key={ drink.idDrink }>
          <img
            src={ drink.strDrinkThumb }
            data-testid="recipe-photo"
            alt={ drink.strDrink }
            width="100px"
          />

          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favoritar Receita
          </button>
          <button
            type="button"
            data-testid="share-btn"
          >
            Compartilhar
          </button>
          <h3
            data-testid="recipe-title"
          >
            {drink.strDrink}
          </h3>
          <h4
            data-testid="recipe-category"
          >
            {drink.strCategory}
          </h4>
          <h4>
            {drink.strAlcoholic}
          </h4>
        </div>
      ))}
      <IngredientsDrinkInProgress
        drink={ drinkInProgress }
        numberOfIngredients={ numberOfIngredients }
      />
      <p
        data-testid="instructions"
      >
        {drinkInProgress && drinkInProgress[0].strInstructions}
      </p>
      <button
        type="button"
        id="finalize"
        disabled={ btnFinalizeRecipe }
        onClick={ () => {
          const {
            idDrink,
            strDrinkThumb,
            strDrink,
            strArea,
            strCategory,
            strTags,
            strAlcoholic,
          } = drinkInProgress[0];
          const data = Date();
          incrementDoneRecipes({
            id: idDrink,
            type: 'cocktail',
            area: strArea || '',
            category: strCategory || '',
            alcoholicOrNot: strAlcoholic || '',
            name: strDrink,
            image: strDrinkThumb,
            doneDate: data,
            tags: strTags || [],
          });
          history.push('/receitas-feitas');
        } }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  drinkInProgress: PropTypes.shape(PropTypes.any).isRequired,
};

export default DrinkInProgress;
