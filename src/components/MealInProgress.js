import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';
import IngredientsMealInProgress from './IngredientsMealInProgress';

function MealInProgress({ mealInProgress }) {
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const { btnFinalizeRecipe } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    if (mealInProgress) {
      const NUMBER_OF_INGREDIENTS = Object.keys(mealInProgress[0])
        .filter((key) => key.includes('strIngredient')).length;
      setNumberOfIngredients(NUMBER_OF_INGREDIENTS);
    }
  }, [mealInProgress]);
  return (
    <div>
      <h1>Meal In progress</h1>
      {mealInProgress && mealInProgress.map((meal) => (
        <div key={ meal.idMeal }>
          <img
            src={ meal.strMealThumb }
            data-testid="recipe-photo"
            alt={ meal.srtMeal }
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
            {meal.strMeal}
          </h3>
          <h4
            data-testid="recipe-category"
          >
            {meal.strCategory}
          </h4>
        </div>
      ))}
      <IngredientsMealInProgress
        meal={ mealInProgress }
        numberOfIngredients={ numberOfIngredients }
      />
      <p
        data-testid="instructions"
      >
        {mealInProgress && mealInProgress[0].strInstructions}
      </p>
      <button
        type="button"
        id="finalize"
        disabled={ btnFinalizeRecipe }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

MealInProgress.propTypes = {
  mealInProgress: PropTypes.shape(PropTypes.any).isRequired,
};

export default MealInProgress;
