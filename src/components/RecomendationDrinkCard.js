import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function DrinkCard({ drink, index }) {
  const { strDrinkThumb, strDrink, idDrink } = drink;
  const history = useHistory();
  const link = `/bebidas/${idDrink}`;
  return (
    <button
      className="recomendation__card"
      type="button"
      onClick={ () => history.push(link) }
      data-testid={ `${index}-recomendation-card` }
    >
      <div>
        <img
          src={ strDrinkThumb }
          alt="img"
          width="100px"
        />
        <h3
          data-testid={ `${index}-recomendation-title` }
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
  index: PropTypes.string.isRequired,
};

export default DrinkCard;
