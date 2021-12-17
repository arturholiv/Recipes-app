import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [mealProgress, setMealProgress] = useState([]);
  const [currentMealId, setCurrentMealId] = useState();
  const [drinkProgress, setdrinkProgress] = useState([]);
  const [btnFinalizeRecipe, setBtnFinalizeRecipe] = useState(true);
  const [doneRecipes, setDoneRecipes] = useState([{ teste: '11111' }]);

  function incrementDoneRecipes(recipe) {
    setDoneRecipes([...doneRecipes, recipe]);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  const contextValue = {
    searchRecipes,
    setSearchRecipes,
    mealProgress,
    setMealProgress,
    drinkProgress,
    setdrinkProgress,
    currentMealId,
    setCurrentMealId,
    btnFinalizeRecipe,
    setBtnFinalizeRecipe,
    incrementDoneRecipes,
    doneRecipes,
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
