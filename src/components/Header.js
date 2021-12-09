import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Redirect } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function Header() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  const location = useLocation();
  const pathName = location.pathname.replace('/', '');

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
        {`${pathName[0].toUpperCase()}${pathName.slice(1, pathName.length)}`}
      </h1>

      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleToggleSearch }
        src={ searchIcon }
      >
        <img src={ searchIcon } alt="searchIcon" />
      </button>
      {toggleSearch && <Search />}
      {redirect && <Redirect to="/perfil" />}
    </header>
  );
}

export default Header;
