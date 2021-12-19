import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import IngredienteCard from './IngredientCard';

function IngredientsDrinkInProgress({ drink, numberOfIngredients }) {
  useEffect(() => {}, []);

  function getIngredients() {
    const drinkObj = drink[0];
    const ingredientsKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const ingredient = `strIngredient${i}`;
      ingredientsKeys.push(ingredient);
    }
    const ingredients = Object.keys(drink[0])
      .filter((key) => ingredientsKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = drinkObj[key];
        return obj;
      }, {});

    return ingredients;
  }

  function renderIngredients() {
    if (drink && numberOfIngredients > 0) {
      const array = Object.values(getIngredients());
      const ingredientsArray = array.filter((el) => Boolean(el));
      return (
        ingredientsArray.map((ingredient, index) => {
          if (ingredient) {
            return (
              <IngredienteCard
                ingrediente={ ingredient }
                index={ index }
                type="cocktails"
                numberOfIngredients={ ingredientsArray.length }
                id={ drink[0].idDrink }
              />
            );
          }
          return undefined;
        })
      );
    }
  }

  function getMeasures() {
    const drinkObj = drink[0];
    const MeasureKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const measure = `strMeasure${i}`;
      MeasureKeys.push(measure);
    }
    const measures = Object.keys(drink[0])
      .filter((key) => MeasureKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = drinkObj[key];
        return obj;
      }, {});

    return measures;
  }

  function renderMeasures() {
    if (drink && numberOfIngredients > 0) {
      const measuresArray = Object.values(getMeasures());
      return (
        measuresArray.map((measure, index) => (
          <h4
            key={ index }
          >
            {measure}
          </h4>
        ))
      );
    }
  }
  return (
    <div>
      {renderIngredients()}
      {renderMeasures()}
    </div>
  );
}

IngredientsDrinkInProgress.propTypes = {
  drink: PropTypes.arrayOf(PropTypes.any).isRequired,
  numberOfIngredients: PropTypes.number.isRequired,
};

export default IngredientsDrinkInProgress;
