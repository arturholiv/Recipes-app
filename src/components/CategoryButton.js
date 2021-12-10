import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { requestMealDbApi } from '../services/TheMealDbApi';
import { requestCocktailDbApi } from '../services/TheCockTailDbApi';

function CategoryButton({ category, setMeals, setDrinks, name }) {
  const [selected, setSelected] = useState(false);

  async function handleClick({ target: { name: type } }) {
    if (type === 'meals' && !selected) {
      const result = await requestMealDbApi(category);
      setMeals(result);
      setSelected(true);
    } else if (type === 'drinks' && !selected) {
      const result = await requestCocktailDbApi(category);
      setDrinks(result);
      setSelected(true);
    }
    if (selected && type === 'drinks') {
      const result = await requestCocktailDbApi();
      setDrinks(result);
      setSelected(false);
    } else if (selected && type === 'meals') {
      const result = await requestMealDbApi();
      setMeals(result);
      setSelected(false);
    }
    if (type === 'all' && setDrinks) {
      const result = await requestCocktailDbApi();
      setDrinks(result);
      setSelected(true);
    } else if (type === 'all' && setMeals) {
      const result = await requestMealDbApi();
      setMeals(result);
      setSelected(true);
    }
  }

  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      name={ name }
      onClick={ (e) => handleClick(e) }
    >
      {category}

    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setDrinks: PropTypes.func.isRequired,
  setMeals: PropTypes.func.isRequired,
};

export default CategoryButton;
