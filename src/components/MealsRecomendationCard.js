import React, { useEffect, useState } from 'react';
import MealCard from './MealCard';
import { requestMealDbApi } from '../services/TheMealDbApi';
import RecipeDetails from './RecipeDetails';
// import { useParams } from 'react-router';

function MealsRecomendationCard() {
  const MAX_MEALS_RENDER = 6;

  const [meals, setMeals] = useState(false);

  useEffect(() => {
    async function getMeals() {
      const mealsResult = await requestMealDbApi();
      setMeals(mealsResult);
    }
    getMeals();
  }, []);

  function setRecomendations() {
    meals.slice(0, MAX_MEALS_RENDER).map((meal, index) => (
      <MealCard
        key={ meal.strMeal }
        meal={ meal }
        index={ index }
      />));
  }
  return (
    setRecomendations()
  );
}

export default MealsRecomendationCard;
