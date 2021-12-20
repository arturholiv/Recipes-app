import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function MealCard({ index, meal }) {
  const { idMeal } = meal;
  const { setCurrentMealId } = useContext(AppContext);
  const history = useHistory();
  const link = `/comidas/${idMeal}`;
  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => {
        setCurrentMealId(idMeal);
        history.push(link);
      } }
    >
      <div>
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
    </button>
  );
}

MealCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};
export default MealCard;
