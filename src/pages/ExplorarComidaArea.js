import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidaArea() {
  const MAX_MEALS_RENDER = 12;

  const [areas, setAreas] = useState([]);
  const [renderAreas, setRenderAreas] = useState(false);
  const [meals, setMeals] = useState([]);
  const [renderMeals, setRenderMeals] = useState(false);

  const history = useHistory();

  const getListOfAreas = async () => {
    const areasList = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((items) => items.json());
    setAreas(areasList.meals);
    setRenderAreas(true);
  };

  const getMealsByArea = async ({ target }) => {
    const mealsByArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`)
      .then((items) => items.json());
    setMeals(mealsByArea.meals);
    setRenderMeals(true);
  };

  const getMealsByFirstArea = async () => {
    const mealsByArea = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American')
      .then((items) => items.json());
    setMeals(mealsByArea.meals);
    setRenderMeals(true);
  };

  useEffect(() => {
    getListOfAreas();
    getMealsByFirstArea();
  }, []);

  return (
    <div>
      <Header />
      <select data-testid="explore-by-area-dropdown" onChange={ getMealsByArea }>
        <option data-testid="All-option">All</option>
        {
          renderAreas && areas.map(
            (area) => (
              <option
                data-testid={ `${area.strArea}-option` }
                key={ area.strArea }
              >
                {area.strArea}
              </option>),
          )
        }
      </select>
      {
        renderMeals && meals.slice(0, MAX_MEALS_RENDER).map((meal, index) => (
          <button
            type="button"
            key={ meal.strMeal }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/comidas/${meal.idMeal}`) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              key={ meal.strMeal }
              alt={ meal.strMeal }
              width="100px"
            />
            <p
              key={ meal.strMeal }
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}

            </p>
          </button>
        ))
      }
      <Footer />

    </div>
  );
}

export default withRouter(ExplorarComidaArea);
