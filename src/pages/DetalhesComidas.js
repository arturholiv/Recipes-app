import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestMealById } from '../services/TheMealDbApi';
import RecipeDetails from '../components/RecipeDetails';

export default function DetalhesComidas() {
  const { id } = useParams();

  const numberOfIngredients = 20;
  // const MyIngredients = [];
  // const MyMeasures = [];

  const [details, setDetails] = useState([]);
  // const [numberOfIngredients, setNumberOfIngredients] = useState([]);

  useEffect(() => {
    const getMealsDetails = async () => {
      const detailsResult = await requestMealById(id);
      setDetails(detailsResult[0]);
      console.log(detailsResult[0]);
    };
    getMealsDetails();
  }, [id]);

  function getIngredients() {
    const mealObj = details;
    const ingredientsKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const ingredient = `strIngredient${i}`;
      ingredientsKeys.push(ingredient);
    }
    const ingredients = Object.keys(details)
      .filter((key) => ingredientsKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = mealObj[key];
        return obj;
      }, {});
    return ingredients;
  }

  function getMeasures() {
    const mealObj = details;
    const MeasureKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const measure = `strMeasure${i}`;
      MeasureKeys.push(measure);
    }
    const measures = Object.keys(details)
      .filter((key) => MeasureKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = mealObj[key];
        return obj;
      }, {});
    return measures;
  }

  function renderIngredients() {
    if (details && numberOfIngredients > 0) {
      const array = Object.values(getIngredients());
      const ingredientsArray = array.filter((el) => Boolean(el));
      console.log(ingredientsArray);
      return (
        ingredientsArray.map((ingredient) => ingredient)
      );
    }
  }

  function renderMeasures() {
    if (details && numberOfIngredients > 0) {
      const array = Object.values(getMeasures());
      const measuresArray = array.filter((el) => Boolean(el));
      console.log(measuresArray);
      return (
        measuresArray.map((measure) => measure));
    }
  }

  return (
    <div>
      <RecipeDetails
        recipeIndex={ 0 }
        photo={ details.strMealThumb }
        title={ details.strMeal }
        recipeCategory={ details.strCategory }
        ingredients={ renderIngredients() }
        measures={ renderMeasures() }
        instructions={ details.strInstructions }
        video={ details.strYoutube }
      />
    </div>
  );
}
