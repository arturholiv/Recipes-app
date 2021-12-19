import PropTypes from 'prop-types';
import React from 'react';
import IngredienteCard from './IngredientCard';

function IngredientsMealInProgress({ meal, numberOfIngredients }) {
  function getIngredients() {
    const mealObj = meal[0];
    const ingredientsKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const ingredient = `strIngredient${i}`;
      ingredientsKeys.push(ingredient);
    }
    const ingredients = Object.keys(meal[0])
      .filter((key) => ingredientsKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = mealObj[key];
        return obj;
      }, {});
    return ingredients;
  }

  function renderIngredients() {
    if (meal && numberOfIngredients > 0) {
      const array = Object.values(getIngredients());
      const ingredientsArray = array.filter((el) => Boolean(el));
      return (
        ingredientsArray.map((ingredient, index) => {
          if (ingredient) {
            return (
              <IngredienteCard
                ingrediente={ ingredient }
                index={ index }
                type="meals"
                numberOfIngredients={ ingredientsArray.length }
                id={ meal[0].idMeal }
              />
            );
          }
          return undefined;
        })
      );
    }
  }

  function getMeasures() {
    const mealObj = meal[0];
    const MeasureKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const measure = `strMeasure${i}`;
      MeasureKeys.push(measure);
    }
    const measures = Object.keys(meal[0])
      .filter((key) => MeasureKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = mealObj[key];
        return obj;
      }, {});

    return measures;
  }

  function renderMeasures() {
    if (meal && numberOfIngredients > 0) {
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

IngredientsMealInProgress.propTypes = {
  meal: PropTypes.arrayOf(PropTypes.any).isRequired,
  numberOfIngredients: PropTypes.number.isRequired,
};

export default IngredientsMealInProgress;
