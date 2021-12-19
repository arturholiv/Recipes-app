import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function DrinkCard({ drink, index }) {
  const { setCurrentDrinkId } = useContext(AppContext);
  const { strDrinkThumb, strDrink, idDrink } = drink;
  const history = useHistory();
  const link = `/bebidas/${idDrink}`;
  return (
    <button
      type="button"
      onClick={ () => {
        setCurrentDrinkId(idDrink);
        history.push(link);
      } }
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
