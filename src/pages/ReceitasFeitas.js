import React, { useState } from 'react';
import Header from '../components/Header';

function ReceitasFeitas() {
  const [filter, setFilter] = useState('All');
  const simulaReceitas = {
    drinks: [{
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      strCategory: 'Ordinary Drink',
      strDrink: 'Margarita',
      dateModified: '2015-08-18 14:42:59',
      strTags: 'IBA,ContemporaryClassic',
      doneDate: '2015-08-18',
    }],
    meals: [{
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      strCategory: 'Vegetarian',
      strMeal: 'Spicy Arrabiata Penne',
      dateModified: null,
      strTags: 'IBA,ContemporaryClassic',
      doneDate: '2015-08-18',
    }],
  };

  const handleChangeFilter = (event) => {
    const { target } = event;
    event.preventDefault();
    setFilter(target.innerText);
  };

  const fillter = (currentFilter) => {
    switch (currentFilter) {
    case 'Food':
      return simulaReceitas.meals;
    case 'Drinks':
      return simulaReceitas.drinks;
    case 'All':
      return [...simulaReceitas.meals, ...simulaReceitas.drinks];
    default:
      return currentFilter;
    }
  };

  const getIndex = (element) => fillter(filter).indexOf(element);

  return (
    <div>
      <Header />
      <form>
        <button
          type="submit"
          data-testid="filter-by-all-btn"
          onClick={ (event) => handleChangeFilter(event) }
        >
          All
        </button>
        <button
          type="submit"
          data-testid="filter-by-food-btn"
          onClick={ (event) => handleChangeFilter(event) }
        >
          Food
        </button>
        <button
          type="submit"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleChangeFilter(event) }
        >
          Drinks
        </button>
        {filter
          && fillter(filter).map((curr) => (
            <div key={ curr.strDrink }>
              <img
                src={ curr.strMealThumb || curr.strDrinkThumb }
                alt={ curr.strDrink || curr.strMeal }
                data-testid={ `${getIndex(curr)}-horizontal-image` }
              />
              <p
                data-testid={ `${getIndex(curr)}-horizontal-top-text` }
              >
                {curr.strCategory}
              </p>
              <p
                data-testid={ `${getIndex(curr)}-horizontal-name` }
              >
                {curr.strDrink || curr.strMeal}
              </p>
              <span
                data-testid={ `${getIndex(curr)}-horizontal-done-date` }
              >
                {curr.doneDate}
              </span>
              <button
                type="submit"
                data-testid={ `${getIndex(curr)}-horizontal-share-btn` }
              >
                share
              </button>
              <p
                data-testid={ `${getIndex(curr)}-${curr.strTags}-horizontal-tag` }
              >
                {curr.strTags}
              </p>
            </div>))}
      </form>
    </div>
  );
}

export default ReceitasFeitas;
