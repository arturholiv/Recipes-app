import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestDrinkById } from '../services/TheCockTailDbApi';
import RecipeDetails from '../components/RecipeDetails';

export default function DetalhesBebidas() {
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  const numberOfIngredients = 20;

  useEffect(() => {
    const getDrinksDetails = async () => {
      const detailsResult = await requestDrinkById(id);
      setDetails(detailsResult[0]);
    };
    getDrinksDetails();
  }, [id]);

  function getIngredients() {
    const drinkObj = details;
    const ingredientsKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const ingredient = `strIngredient${i}`;
      ingredientsKeys.push(ingredient);
    }
    const ingredients = Object.keys(details)
      .filter((key) => ingredientsKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = drinkObj[key];
        return obj;
      }, {});
    return ingredients;
  }

  function getMeasures() {
    const drinkObj = details;
    const MeasureKeys = [];

    for (let i = 1; i < numberOfIngredients; i += 1) {
      const measure = `strMeasure${i}`;
      MeasureKeys.push(measure);
    }
    const measures = Object.keys(details)
      .filter((key) => MeasureKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = drinkObj[key];
        return obj;
      }, {});
    return measures;
  }

  function renderIngredients() {
    if (details && numberOfIngredients > 0) {
      const array = Object.values(getIngredients());
      const ingredientsArray = array.filter((el) => !!el);
      return (
        ingredientsArray.map((ingredient) => ingredient)
      );
    }
  }

  function renderMeasures() {
    if (details && numberOfIngredients > 0) {
      const array = Object.values(getMeasures());
      const measuresArray = array.filter((el) => !!el);
      return (
        measuresArray.map((measure) => measure));
    }
  }

  return (
    <div>
      <RecipeDetails
        id={ id }
        photo={ details.strDrinkThumb }
        title={ details.strDrink }
        recipeCategory={ details.strAlcoholic }
        ingredients={ renderIngredients() }
        measures={ renderMeasures() }
        instructions={ details.strInstructions }
        video={ false }
      />
    </div>
  );
}
  useEffect(() => {
    const getDrinksDetails = async () => {
      const detailsResult = await requestDrinkById(id);
      setDetails(detailsResult);
      return details;
    };
    getDrinksDetails();
  }, []);

  return (
    <div>
      <h1>
        {' '}
        este eh o id
        {' '}
        {id}
      </h1>
      <h1>to aq nas Bebidas</h1>
    </div>
  );
}

