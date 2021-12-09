import PropTypes from 'prop-types';
import React from 'react';
import { requestMealDbApi } from '../services/TheMealDbApi';

function CategoryButton({ category, setMeals }) {
  async function handleClick({ target: { name } }) {
    try {
      const URL = `www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
      const response = await fetch(URL).then((data) => data.json());
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      name={ `${category}` }
      onClick={ (e) => handleClick(e) }
    >
      {category}

    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  setMeals: PropTypes.func.isRequired,
};

export default CategoryButton;
