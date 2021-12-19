import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [currentMealId, setCurrentMealId] = useState();
  const [currentDrinkId, setCurrentDrinkId] = useState();
  const [btnFinalizeRecipe, setBtnFinalizeRecipe] = useState(true);
  const [progress, setProgress] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {
      id: [],
    },
    meals: {
      id: [],
    },
  });
  const [doneRecipes, setDoneRecipes] = useState([{ id: '11111' }]);

  function updateRecipeInProgress(recipe, type) {
    if (type === 'cocktails') {
      setInProgressRecipes({
        ...inProgressRecipes,
        cocktails: {
          ...recipe,
        },
      });
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        {
          ...inProgressRecipes,
          cocktails: {
            ...recipe,
          },
        },
      ));
    }
    if (type === 'meals') {
      setInProgressRecipes({
        ...inProgressRecipes,
        meals: {
          ...recipe,
        },
      });
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        {
          ...inProgressRecipes,
          meals: {
            ...recipe,
          },
        },
      ));
    }
  }

  function updateProgress(newProgress, type) {
    setProgress([...progress, newProgress]);
    if (type === 'cocktails') {
      updateRecipeInProgress({
        ...inProgressRecipes.cocktails,
        [currentDrinkId]: [...progress, newProgress],
      }, type);
    }
    if (type === 'meals') {
      console.log('entrei');
      updateRecipeInProgress({
        ...inProgressRecipes.meals,
        [currentMealId]: [...progress, newProgress],
      }, type);
    }
  }

  function incrementDoneRecipes(recipe) {
    setDoneRecipes([...doneRecipes, recipe]);
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipe]));
  }

  const contextValue = {
    searchRecipes,
    setSearchRecipes,
    setCurrentMealId,
    btnFinalizeRecipe,
    setBtnFinalizeRecipe,
    incrementDoneRecipes,
    doneRecipes,
    updateRecipeInProgress,
    inProgressRecipes,
    progress,
    setCurrentDrinkId,
    updateProgress,
    currentDrinkId,
    currentMealId,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
