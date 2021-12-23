import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';
import IngredientsMealInProgress from './IngredientsMealInProgress';

function MealInProgress({ mealInProgress }) {
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    btnFinalizeRecipe,
    incrementDoneRecipes,
    updateFavoriteRecipes,
  } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    function verifyIfIsFavorite() {
      const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (!favoritesRecipes) {
        localStorage.setItem('favoritesRecipes', JSON.stringify([]));
      }
      if (favoritesRecipes && favoritesRecipes.length > 0) {
        console.log(favoritesRecipes);
        const isThisFavorite = favoritesRecipes
          .some((recipe) => recipe.id === mealInProgress[0].idMeal);
        console.log(isThisFavorite);
        setIsFavorite(isThisFavorite);
      }
    }

    if (mealInProgress) {
      const NUMBER_OF_INGREDIENTS = Object.keys(mealInProgress[0])
        .filter((key) => key.includes('strIngredient')).length;
      setNumberOfIngredients(NUMBER_OF_INGREDIENTS);
      verifyIfIsFavorite();
    }
  }, [mealInProgress]);

  function handleClick(event) {
    event.preventDefault();
    const link = `http://localhost:3000/comidas/${mealInProgress[0].idMeal}`;
    setCopied(true);
    window.navigator.clipboard.writeText(link);
  }

  function favoriteRecipe() {
    setIsFavorite(!isFavorite);
    if (mealInProgress.length > 0) {
      const {
        idMeal,
        strMealThumb,
        strMeal,
        strArea,
        strCategory,
      } = mealInProgress[0];
      updateFavoriteRecipes(
        {
          id: idMeal,
          type: 'meals',
          area: strArea || '',
          category: strCategory || '',
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      );
    }
  }

  function renderFavoriteStatus() {
    if (isFavorite) {
      return (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteRecipe }
          src={ blackHeartIcon }
        >
          <img src={ blackHeartIcon } alt=" black heart" />
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoriteRecipe }
        src={ whiteHeartIcon }
      >
        <img src={ whiteHeartIcon } alt="white heart" />
      </button>
    );
  }
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
          {renderFavoriteStatus()}

          <button
            type="button"
            data-testid="share-btn"
            onClick={ (e) => handleClick(e) }
          >
            <img src={ shareIcon } alt="shareIcon" />
            {copied && <p>Link copiado!</p>}
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
        onClick={ () => {
          const {
            idMeal,
            strMealThumb,
            strMeal,
            strArea,
            strCategory,
            strTags,
          } = mealInProgress[0];
          const data = Date();
          incrementDoneRecipes({
            id: idMeal,
            type: 'meal',
            area: strArea || '',
            category: strCategory || '',
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
            doneDate: data,
            tags: strTags || '',
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

MealInProgress.propTypes = {
  mealInProgress: PropTypes.shape(PropTypes.any).isRequired,
};

export default MealInProgress;
