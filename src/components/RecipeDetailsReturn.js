import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import RecomendationMealCard from './RecomendationMealCard';
import RecomendationDrinkCard from './RecomendationDrinkCard';

const MAX_DRINKS_RENDER = 6;
const MAX_MEALS_RENDER = 6;

export default function RecipeDetailsReturn({ photo, title, recipeCategory,
  instructions, video, copied, copy, renderButton,
  drinks, meals, ingredientsWithMeasures }) {
  return (
    <div>
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
    </div>
  );
}

RecipeDetailsReturn.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf.isRequired,
  drinks: PropTypes.arrayOf.isRequired,
  ingredientsWithMeasures: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
};
