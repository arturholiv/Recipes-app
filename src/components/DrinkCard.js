import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function DrinkCard({ drink, index }) {
  const { strDrinkThumb, strDrink, idDrink } = drink;
  const history = useHistory();
  const link = `/bebidas/${idDrink}`;
  console.log(drink);
  return (
    <button
      type="button"
      onClick={ () => history.push(link) }
    >
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt="img"
          width="100px"
        />
        <h3
          data-testid={ `${index}-card-name` }
        >
          { strDrink}

        </h3>
      </div>

    </button>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
