import React, { useEffect, useState } from 'react';
import { requestMealDbApi, requestMealCategory } from '../services/TheMealDbApi';
import CategoryButton from './CategoryButton';
import MealCard from './MealCard';

function Meals() {
  const MAX_MEALS_RENDER = 12;
  const MAX_CATEGORIES = 5;

  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const mealsResult = await requestMealDbApi();
      setMeals(mealsResult);
      const categoriesResult = await requestMealCategory();
      setCategories(categoriesResult);
    }
    getMeals();
  }, []);

  return (
    <div>
      <div>
        {categories.slice(0, MAX_CATEGORIES).map((category, index) => (
          <CategoryButton
            key={ category.strCategory }
            category={ category.strCategory }
            index={ index }
            setMeals={ setMeals }
            name="meals"
          />
        ))}
        <CategoryButton
          key="All"
          category="All"
          name="all"
          setMeals={ setMeals }
        />
      </div>
      {meals.slice(0, MAX_MEALS_RENDER).map((meal, index) => (
        <MealCard
          key={ meal.strMeal }
          meal={ meal }
          index={ index }
        />))}

    </div>
  );
}

export default Meals;
