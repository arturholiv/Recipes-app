import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchRecipes, setSearchRecipes] = useState([]);
  const contextValue = {
    setSearchRecipes,
    searchRecipes,
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
