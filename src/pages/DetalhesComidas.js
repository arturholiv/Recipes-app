import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestMealById } from '../services/TheMealDbApi';
import RecipeDetails from '../components/RecipeDetails';
// import MealCard from '../components/MealCard';

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
    };
    getMealsDetails();
  }, [id]);

  // const MAX_MEALS_RENDER = 6;

  // const [meals, setMeals] = useState(false);

  // useEffect(() => {
  //   async function getMeals() {
  //     const mealsResult = await requestMealDbApi();
  //     setMeals(mealsResult);
  //   }
  //   getMeals();
  // }, []);

  // function setRecomendations() {
  //   return meals.slice(0, MAX_MEALS_RENDER).map((meal, index) => (
  //     <MealCard
  //       data-testid={ `${index}-recomendation-card` }
  //       key={ meal.strMeal }
  //       meal={ meal }
  //     />));
  // }
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
      return (
        ingredientsArray.map((ingredient) => ingredient)
      );
    }
  }

  function renderMeasures() {
    if (details && numberOfIngredients > 0) {
      const array = Object.values(getMeasures());
      const measuresArray = array.filter((el) => Boolean(el));
      return (
        measuresArray.map((measure) => measure));
    }
  }

  return (
    <div>
      <RecipeDetails
        id={ id }
        photo={ details.strMealThumb }
        title={ details.strMeal }
        recipeCategory={ details.strCategory }
        ingredients={ renderIngredients() }
        measures={ renderMeasures() }
        instructions={ details.strInstructions }
        video={ details.strYoutube }
        type="meals"
        completeObj={ details }
      />
    </div>
  );
}
