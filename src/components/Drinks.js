import React, { useEffect, useState } from 'react';
import { requestCocktailDbApi, requestDrinkCategory } from '../services/TheCockTailDbApi';
import DrinkCard from './DrinkCard';
import CategoryButton from './CategoryButton';

function Drinks() {
  const MAX_MEALS_RENDER = 12;
  const MAX_CATEGORIES = 5;

  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getDrinks() {
      const drinksResult = await requestCocktailDbApi();
      setDrinks(drinksResult);
      const categoriesResult = await requestDrinkCategory();
      setCategories(categoriesResult);
    }
    getDrinks();
  }, []);

  return (
    <div>
      <div>
        {categories.slice(0, MAX_CATEGORIES).map((category) => (
          <CategoryButton
            key={ category.strCategory }
            category={ category.strCategory }
            name="drinks"
            setDrinks={ setDrinks }
          />
        ))}
        <CategoryButton
          key="All"
          category="All"
          name="all"
          setDrinks={ setDrinks }
        />
      </div>
      {drinks.slice(0, MAX_MEALS_RENDER).map((drink, index) => (
        <DrinkCard
          key={ drink.strMeal }
          drink={ drink }
          index={ index }
        />))}
    </div>
  );
}

export default Drinks;
