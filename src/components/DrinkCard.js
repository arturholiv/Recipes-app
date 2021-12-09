import React from 'react';
import PropTypes from 'prop-types';

function DrinkCard({ drink: { strDrinkThumb, strDrink }, index }) {
  return (
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
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
