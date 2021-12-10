import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import requestSearchApi from '../services/requestSearchApi';

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [ingredient, setIngredient] = useState(false);
  const [name, setName] = useState(false);
  const [firstLetter, setFirstLetter] = useState(false);

  const { setSearchRecipes } = useContext(AppContext);

  const location = useLocation();

  const handleSearch = (event) => {
    event.preventDefault();
    requestSearchApi({ inputValue, ingredient, name, firstLetter }, location.pathname)
      .then((results) => {
        if (results !== null) {
          return setSearchRecipes(results);
        }
        setSearchRecipes([]);
      });
  };

  return (
    <form onSubmit={ (event) => handleSearch(event) }>
      <label htmlFor="search-input">
        <input
          id="search-input"
          data-testid="search-input"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          id="ingredient-search-radio"
          type="radio"
          value="ingrediente"
          data-testid="ingredient-search-radio"
          checked={ ingredient }
          onClick={ () => setIngredient(!ingredient) }
        />
        Ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          id="name-search-radio"
          type="radio"
          value="nome"
          data-testid="name-search-radio"
          checked={ name }
          onClick={ () => setName(!name) }
        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          id="first-letter-search-radio"
          type="radio"
          value="first-letter"
          data-testid="first-letter-search-radio"
          checked={ firstLetter }
          onClick={ () => setFirstLetter(!firstLetter) }
        />
        Primeira letra
      </label>
      <button type="submit" data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default Search;
