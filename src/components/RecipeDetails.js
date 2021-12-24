import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { requestMealDbApi } from '../services/TheMealDbApi';
import { requestCocktailDbApi } from '../services/TheCockTailDbApi';
import RecomendationMealCard from './RecomendationMealCard';
import RecomendationDrinkCard from './RecomendationDrinkCard';
import AppContext from '../context/AppContext';
import {
  verifyIfIsDone,
  verifyIfIsInProgress,
  renderButton,
  renderFavoriteStatus,
} from '../helpers';

function RecipeDetails({
  photo, title, recipeCategory, ingredients, measures,
  instructions, video, id, type, completeObj }) {
  const { updateProgress, updateFavoriteRecipes } = useContext(AppContext);

  const [ingredientsWithMeasures, setIngredientsWithMeasures] = useState(false);

  const [showButton, setShowButton] = useState(true);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [drinks, setDrinks] = useState(false);

  const history = useHistory();

  const MAX_MEALS_RENDER = 6;
  const arrayIngredientsWithMeasures = [];

  const [meals, setMeals] = useState(false);

  function agroupMeasuresAndIngredients() {
    if (ingredients.length > 1) {
      for (let i = 0; i < ingredients.length; i += 1) {
        arrayIngredientsWithMeasures.push({
          measure: measures[i],
          ingredient: ingredients[i],
        });
      }
      setIngredientsWithMeasures(arrayIngredientsWithMeasures);
    }
  }

  useEffect(() => {
    async function getMeals() {
      const mealsResult = await requestMealDbApi();
      setMeals(mealsResult);
    }
    getMeals();
    async function getDrinks() {
      const drinksResult = await requestCocktailDbApi();
      setDrinks(drinksResult);
    }
    getDrinks();
    if (ingredients.length > 0) {
      agroupMeasuresAndIngredients();
    }
    verifyIfIsDone(setShowButton, id);
    verifyIfIsInProgress(type, id, setShowContinueButton);
    setIsFavorite(false);
  }, [ingredients]);

  const MAX_DRINKS_RENDER = 6;

  const [copied, setCopied] = useState(false);

  function copy() {
    setCopied(true);
  }

  return (
    <div>
      <div>
        <img src={ photo } alt={ title } data-testid="recipe-photo" />
      </div>
      <h1 data-testid="recipe-title">
        {title}
      </h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copy }
        src={ shareIcon }
        className="share"
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>

      <p>
        {!copied ? 'Copy link' : 'Link copiado!'}
      </p>

      {renderFavoriteStatus(isFavorite, updateFavoriteRecipes, completeObj, type)}

      <h3 data-testid="recipe-category">
        Category:
        { recipeCategory }
      </h3>

      <p data-testid="instructions">{ instructions }</p>

      <ul>
        {ingredientsWithMeasures && ingredientsWithMeasures.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { ingredient.measure }
            { ingredient.ingredient }
          </li>
        ))}
      </ul>

      <div>
        {video
          ? (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ video }
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          ) : false}
      </div>

      <div className="recomendation">
        {video
          ? (
            drinks && drinks.slice(0, MAX_DRINKS_RENDER).map((drink, index) => (
              <RecomendationDrinkCard
                key={ drink.strMeal }
                index={ index }
                drink={ drink }
              />))
          ) : meals && meals.slice(0, MAX_MEALS_RENDER).map((meal, index) => (
            <RecomendationMealCard
              index={ index }
              key={ meal.strMeal }
              meal={ meal }
            />))}
      </div>
      {
        renderButton(showButton, showContinueButton, {
          history,
          video,
          id,
          type,
        }, updateProgress)
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  completeObj: PropTypes.arrayOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.any).isRequired, // se pá é array
  instructions: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.any).isRequired,
  photo: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
};

export default RecipeDetails;
