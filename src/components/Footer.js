import React, { useState } from 'react';
import { Redirect } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState('');

  const getPathByBtn = (pathByBtn) => {
    setPath(pathByBtn);
    setRedirect(true);
  };

  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        onClick={ () => getPathByBtn('comidas') }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => getPathByBtn('bebidas') }
      >
        <img src={ drinkIcon } alt="drinkIcon" />

      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        onClick={ () => getPathByBtn('explorar') }
      >
        <img src={ exploreIcon } alt="exploreIcon" />

      </button>
      {redirect && <Redirect to={ `/${path}` } /> }
    </footer>
  );
}

export default Footer;
