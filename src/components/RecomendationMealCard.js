import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function RecomendationMealCard({ meal, index }) {
  const { idMeal } = meal;
  const history = useHistory();
  const link = `/comidas/${idMeal}`;
  return (
    <button
      className="recomendation__card"
      type="button"
      onClick={ () => history.push(link) }
      data-testid={ `${index}-recomendation-card` }
    >
      <div>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          width="100px"
        />
        <h3
          data-testid={ `${index}-recomendation-title` }
        >
          { meal.strMeal}
        </h3>
      </div>
    </button>
  );
}

RecomendationMealCard.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.string.isRequired,
};
export default RecomendationMealCard;
