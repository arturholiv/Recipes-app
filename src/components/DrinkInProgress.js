import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import IngredientsDrinkInProgress from './IngredientsDrinkInProgress';

function DrinkInProgress({ drinkInProgress }) {
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
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
            testid="favorite-btn"
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
        onClick={ () => history.push('/receitas-feitas') }
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
