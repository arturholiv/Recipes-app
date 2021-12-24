import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import IngredientsDrinkInProgress from './IngredientsDrinkInProgress';
import AppContext from '../context/AppContext';

function DrinkInProgress({ drinkInProgress }) {
  console.log(drinkInProgress);
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    btnFinalizeRecipe,
    incrementDoneRecipes,
    updateFavoriteRecipes,
  } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    function verifyIfIsFavorite() {
      const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (!favoritesRecipes) {
        localStorage.setItem('favoritesRecipes', JSON.stringify([]));
      }
      if (favoritesRecipes) {
        console.log(favoritesRecipes);
        const isThisFavorite = favoritesRecipes
          .some((recipe) => recipe.id === drinkInProgress[0].idDrink);
        console.log(isThisFavorite);
        setIsFavorite(isThisFavorite);
      }
    }

    if (drinkInProgress) {
      const NUMBER_OF_INGREDIENTS = Object.keys(drinkInProgress[0])
        .filter((key) => key.includes('strIngredient')).length;
      setNumberOfIngredients(NUMBER_OF_INGREDIENTS);
      verifyIfIsFavorite();
    }
  }, [drinkInProgress]);

  function handleClick(event) {
    event.preventDefault();
    const link = `http://localhost:3000/bebidas/${drinkInProgress[0].idDrink}`;
    window.navigator.clipboard.writeText(link);
    setCopied(true);
  }

  function favoriteRecipe() {
    setIsFavorite(!isFavorite);
    if (drinkInProgress.length > 0) {
      const {
        idDrink,
        strDrinkThumb,
        strDrink,
        strArea,
        strCategory,
        strAlcoholic,
      } = drinkInProgress[0];
      updateFavoriteRecipes(
        {
          id: idDrink,
          type: 'cocktails',
          area: strArea || '',
          category: strCategory || '',
          alcoholicOrNot: strAlcoholic || '',
          name: strDrink,
          image: strDrinkThumb,
        },
      );
    }
  }

  function renderFavoriteStatus() {
    if (isFavorite) {
      return (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteRecipe }
          src={ blackHeartIcon }
        >
          <img src={ blackHeartIcon } alt=" black heart" />
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoriteRecipe }
        src={ whiteHeartIcon }
      >
        <img src={ whiteHeartIcon } alt="white heart" />
      </button>
    );
  }

  return (
    <div>
      <h1>Drink In progress</h1>
      {drinkInProgress && drinkInProgress.map((drink) => (
        <div key={ drink.idDrink }>
          <img
            src={ drink.strDrinkThumb }
            data-testid="recipe-photo"
            alt={ drink.strDrink }
            width="100px"
          />

          {renderFavoriteStatus()}

          <button
            type="button"
            data-testid="share-btn"
            onClick={ (e) => handleClick(e) }
          >
            {copied && <p>Link copiado!</p>}
            <img src={ shareIcon } alt="shareIcon" />
          </button>

          <h3
            data-testid="recipe-title"
          >
            {drink.strDrink}
          </h3>
          <h4
            data-testid="recipe-category"
          >
            {drink.strCategory}
          </h4>
          <h4>
            {drink.strAlcoholic}
          </h4>
        </div>
      ))}
      <IngredientsDrinkInProgress
        drink={ drinkInProgress }
        numberOfIngredients={ numberOfIngredients }
      />
      <p
        data-testid="instructions"
      >
        {drinkInProgress && drinkInProgress[0].strInstructions}
      </p>
      <button
        type="button"
        id="finalize"
        disabled={ btnFinalizeRecipe }
        onClick={ () => {
          const {
            idDrink,
            strDrinkThumb,
            strDrink,
            strArea,
            strCategory,
            strTags,
            strAlcoholic,
          } = drinkInProgress[0];
          const data = Date();
          incrementDoneRecipes({
            id: idDrink,
            type: 'cocktail',
            area: strArea || '',
            category: strCategory || '',
            alcoholicOrNot: strAlcoholic || '',
            name: strDrink,
            image: strDrinkThumb,
            doneDate: data,
            tags: strTags || [],
          });
          history.push('/receitas-feitas');
        } }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  drinkInProgress: PropTypes.shape(PropTypes.any).isRequired,
};

export default DrinkInProgress;
