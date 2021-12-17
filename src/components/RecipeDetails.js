// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import MealsRecomendationCard from './MealsRecomendationCard';
// import DrinksRecomendationCard from './DrinksRecomendationCard';

function RecipeDetails({
  photo, title, recipeCategory, ingredients, measures,
  instructions, video, recomendations, id }) {
  // const [redirect, setRedirect] = useState(false);

  return (
    <div>
      <div>
        <img src={ photo } alt={ title } data-testid="recipe-photo" />
      </div>
      <h1 data-testid="recipe-title">
        {title}
      </h1>
      <button type="button" data-testid="share-btn">
        share
      </button>
      <button type="button" data-testid="favorite-btn"> favorite </button>

      <h3 data-testid="recipe-category">
        Category:
        { recipeCategory }
      </h3>

      <p data-testid="instructions">{ instructions }</p>

      <ul>
        { measures.map((measure) => (
          ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { measure }
              {' '}
              { ingredient }
            </li>
          ))

        )) }
      </ul>

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

      {/* <div>
        {video ? recomendations.map((recomendation, index) => (
          <MealsRecomendationCard
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            recomendation={ recomendation }
          />
        )) : recomendations.map((recomendation, index) => (
          <DrinksRecomendationCard
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            recomendation={ recomendation }
          />
        ))}
      </div> */}

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ video ? <Redirect to={ `/comidas/${id}/in-progress` } />
          : <Redirect to={ `/bebidas/${id}/in-progress` } /> }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf.isRequired, // se pá é array
  measures: PropTypes.arrayOf.isRequired,
  id: PropTypes.number.isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  recomendations: PropTypes.string.isRequired,
  recipeIndex: PropTypes.number.isRequired,
};

export default RecipeDetails;
