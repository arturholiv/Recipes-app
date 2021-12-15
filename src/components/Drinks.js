import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { requestCocktailDbApi, requestDrinkCategory } from '../services/TheCockTailDbApi';
import DrinkCard from './DrinkCard';
import CategoryButton from './CategoryButton';
import AppContext from '../context/AppContext';

function Drinks() {
  const MAX_DRINKS_RENDER = 12;
  const MAX_CATEGORIES = 5;

  const { searchRecipes } = useContext(AppContext);

  const [drinks, setDrinks] = useState(false);
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

  useEffect(() => {
    if (searchRecipes.length > 0) {
      setDrinks(searchRecipes);
    }
    if (drinks) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [searchRecipes]);

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
      {drinks && drinks.slice(0, MAX_DRINKS_RENDER).map((drink, index) => (
        <DrinkCard
          key={ drink.strMeal }
          drink={ drink }
          index={ index }
        />))}
      { (searchRecipes.length === 1)
        && <Redirect to={ `bebidas/${searchRecipes[0].idDrink}` } /> }
    </div>
  );
}

export default Drinks;
