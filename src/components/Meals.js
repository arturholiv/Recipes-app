import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router';
import AppContext from '../context/AppContext';
import { requestMealDbApi, requestMealCategory } from '../services/TheMealDbApi';
import CategoryButton from './CategoryButton';
import MealCard from './MealCard';

function Meals() {
  const MAX_MEALS_RENDER = 12;
  const MAX_CATEGORIES = 5;

  const [meals, setMeals] = useState(false);
  const [categories, setCategories] = useState([]);

  const { searchRecipes } = useContext(AppContext);

  useEffect(() => {
    async function getMeals() {
      const mealsResult = await requestMealDbApi();
      setMeals(mealsResult);
      const categoriesResult = await requestMealCategory();
      setCategories(categoriesResult);
    }
    getMeals();
  }, []);

  useEffect(() => {
    if (searchRecipes.length > 0) {
      setMeals(searchRecipes);
    }
    if (meals) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [searchRecipes]);

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
      {meals && meals.slice(0, MAX_MEALS_RENDER).map((meal, index) => (
        <MealCard
          key={ meal.strMeal }
          meal={ meal }
          index={ index }
        />)) }
      { (searchRecipes.length === 1)
        && <Redirect to={ `comidas/${searchRecipes[0].idMeal}` } /> }
    </div>
  );
}

export default Meals;
