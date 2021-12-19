import React, { useEffect, useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { Clipboard } from 'clipboard'
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { requestMealDbApi } from '../services/TheMealDbApi';
import { requestCocktailDbApi } from '../services/TheCockTailDbApi';
import RecomendationMealCard from './RecomendationMealCard';
import RecomendationDrinkCard from './RecomendationDrinkCard';
import AppContext from '../context/AppContext';

function RecipeDetails({
  photo, title, recipeCategory, ingredients, measures,
  instructions, video, id, type }) {
  const { updateProgress } = useContext(AppContext);

  const [ingredientsWithMeasures, setIngredientsWithMeasures] = useState(false);

  const [showButton, setShowButton] = useState(true);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const history = useHistory();

  const MAX_MEALS_RENDER = 6;
  const arrayIngredientsWithMeasures = [];

  const [meals, setMeals] = useState(false);

  function verifyIfIsDone() {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (id && doneRecipesStorage) {
      const isDone = doneRecipesStorage.some((recipe) => recipe.id === id);
      setShowButton(!isDone);
    }
  }

  function verifyIfIsInProgress() {
    const inProgressRecipeStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipeStorage && type === 'cocktails') {
      const { cocktails } = inProgressRecipeStorage;
      const recipeInProgress = Object.keys(cocktails).some((i) => i === id);
      console.log(recipeInProgress);
      if (recipeInProgress) {
        setShowContinueButton(true);
      }
    }
    if (inProgressRecipeStorage && type === 'meals') {
      const mealsStorage = inProgressRecipeStorage.meals;
      console.log(mealsStorage);
      const recipeInProgress = Object.keys(mealsStorage).some((i) => i === id);
      console.log(recipeInProgress);
      if (recipeInProgress) {
        setShowContinueButton(true);
      }
    }
  }

  useEffect(() => {
    async function getMeals() {
      const mealsResult = await requestMealDbApi();
      setMeals(mealsResult);
    }
    getMeals();
    verifyIfIsDone();
    verifyIfIsInProgress();
  }, []);

  const MAX_DRINKS_RENDER = 6;

  const [drinks, setDrinks] = useState(false);

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
    async function getDrinks() {
      const drinksResult = await requestCocktailDbApi();
      setDrinks(drinksResult);
    }
    getDrinks();
    if (ingredients.length > 0) {
      agroupMeasuresAndIngredients();
    }
  }, [ingredients]);

  function handleClick() {
    updateProgress('', type);
    return (video ? history.push(`/comidas/${id}/in-progress`)
      : history.push(`/bebidas/${id}/in-progress`));
  }

  function renderButton() {
    if (showButton && !showContinueButton) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ () => handleClick() }
        >
          Iniciar Receita
        </button>
      );
    }
    if (showContinueButton) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ () => (video ? history.push(`/comidas/${id}/in-progress`)
            : history.push(`/bebidas/${id}/in-progress`)) }
        >
          Continuar Receita
        </button>
      );
    }
    return undefined;
  }

  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    // const clipboard = new Clipboard('share');
    // clipboard.on('success', () => {
    // });
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
      <CopyToClipboard text={ window.location.href }>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copy }
          src={ shareIcon }
          className="share"
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
      </CopyToClipboard>

      <p>
        {!copied ? 'Copy link' : 'Link copiado!'}
      </p>

      <button type="button" data-testid="favorite-btn"> favorite </button>

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
        renderButton()
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf.isRequired, // se pá é array
  measures: PropTypes.arrayOf.isRequired,
  id: PropTypes.number.isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
};

export default RecipeDetails;
