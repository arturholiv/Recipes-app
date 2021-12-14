import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [mealProgress, setMealProgress] = useState([]);
  const [currentMealId, setCurrentMealId] = useState();
  const [drinkProgress, setdrinkProgress] = useState([]);
  const [btnFinalizeRecipe, setBtnFinalizeRecipe] = useState(true);

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
