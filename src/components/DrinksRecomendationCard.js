import React, { useEffect, useState } from 'react';
import { requestCocktailDbApi } from '../services/TheCockTailDbApi';
import DrinkCard from './DrinkCard';
// import { useParams } from 'react-router';

function DrinksRecomendationCard() {
  const MAX_DRINKS_RENDER = 6;

  const [drinks, setDrinks] = useState(false);

  useEffect(() => {
    async function getDrinks() {
      const drinksResult = await requestCocktailDbApi();
      setDrinks(drinksResult);
    }
    getDrinks();
  }, []);
  function setRecomendations() {
    drinks.slice(0, MAX_DRINKS_RENDER).map((drink, index) => (
      <DrinkCard
        key={ drink.strDrink }
        drink={ drink }
        index={ index }
      />));
  }
  return (
    setRecomendations()
  );
}

export default DrinksRecomendationCard;
