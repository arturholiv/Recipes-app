import React from 'react';
import { Redirect } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  // const [] = useState('');

  return (
    <header>
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profileIcon" />
      </button>

      <h1 data-testid="page-title">
        PageTitle
      </h1>

      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ <Redirect to="/perfil" /> }
      >
        <img src={ searchIcon } alt="searchIcon" />
      </button>

    </header>
  );
}

export default Header;
