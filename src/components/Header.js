import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Redirect } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function Header() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [showInput, setShowInput] = useState(true);

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  const location = useLocation();
  const pathName = location.pathname;

  const pathNameToText = (string) => {
    function capitalize(text) {
      return `${text[0].toUpperCase()}${text.slice(1, text.length)}`;
    }
    let array;
    if (string.includes('/')) {
      array = string.split('/');
    }
    if (string.includes('-', '/')) {
      // array = string.split('-').slice(0, string.length);
      // const arraySplitting = string.split('-');
      array = string.split('-').join(' ').slice(1).split(' ');
      console.log(array.join(' ').slice(1));
      // array = string.split('-');
    }

    array = array.filter((name) => name);
    array = [array[0], array[array.length - 1]].map((elem) => capitalize(elem));

    const final = array.join(' ');

    return final.includes('Area') ? final.replace('Area', 'Origem') : final;
  };

  useEffect(() => {
    if (pathName === '/perfil'
    || pathName === '/explorar'
    || pathName === '/explorar/comidas'
    || pathName === '/explorar/bebidas'
    || pathName === '/explorar/comidas/ingredientes'
    || pathName === '/explorar/bebidas/ingredientes'
    || pathName === '/receitas-feitas'
    || pathName === '/receitas-favoritas'
    ) {
      setShowInput(false);
    }
  }, [pathName]);

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => setRedirect(true) }
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="profile Icon" />
      </button>

      <h1 data-testid="page-title">
        {pathNameToText(pathName)}
      </h1>

      {showInput && (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ handleToggleSearch }
          src={ searchIcon }
        >
          <img src={ searchIcon } alt="searchIcon" />
        </button>
      )}
      {toggleSearch && <Search />}
      {redirect && <Redirect to="/perfil" />}
    </header>
  );
}

export default Header;