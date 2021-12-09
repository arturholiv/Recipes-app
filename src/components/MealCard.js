import PropTypes from 'prop-types';
import React from 'react';

function MealCard({ index, meal }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        width="100px"
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        { meal.strMeal}
      </h3>
    </div>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default MealCard;
