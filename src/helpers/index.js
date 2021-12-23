import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export function verifyIfIsDone(setShowButton, id) {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (id && doneRecipesStorage) {
    const isDone = doneRecipesStorage.some((recipe) => recipe.id === id);
    setShowButton(!isDone);
  }
}

export function verifyIfIsInProgress(type, id, setShowContinueButton) {
  const inProgressRecipeStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipeStorage && type === 'cocktails') {
    const { cocktails } = inProgressRecipeStorage;
    const recipeInProgress = Object.keys(cocktails).some((i) => i === id);
    if (recipeInProgress) {
      setShowContinueButton(true);
    }
  }
  if (inProgressRecipeStorage && type === 'meals') {
    const mealsStorage = inProgressRecipeStorage.meals;
    const recipeInProgress = Object.keys(mealsStorage).some((i) => i === id);
    if (recipeInProgress) {
      setShowContinueButton(true);
    }
  }
}

export function favoriteRecipes(updateFavoriteRecipes, obj, type) {
  if (type === 'meals') {
    updateFavoriteRecipes(
      {
        id: obj.idMeal,
        type,
        area: obj.strArea || '',
        category: obj.recipeCategory || '',
        alcoholicOrNot: obj.strAlcoholic || '',
        name: obj.idMeal,
        image: obj.strMealThumb,
      },
    );
  } else {
    updateFavoriteRecipes(
      {
        id: obj.idDrink,
        type,
        area: obj.strArea || '',
        category: obj.recipeCategory || '',
        alcoholicOrNot: obj.strAlcoholic || '',
        name: obj.idDrink,
        image: obj.strDrinkThumb,
      },
    );
  }
}

export function renderFavoriteStatus(isFavorite, updateFavoriteRecipes, obj, type) {
  if (isFavorite) {
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => favoriteRecipes(updateFavoriteRecipes, obj, type) }
      >
        <img src={ blackHeartIcon } alt=" black heart" />
      </button>
    );
  }
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ () => favoriteRecipes(updateFavoriteRecipes, obj) }
    >
      <img src={ whiteHeartIcon } alt="white heart" />
    </button>
  );
}

function handleClick(obj, updateProgress) {
  updateProgress('', obj.type);
  return (obj.video ? obj.history.push(`/comidas/${obj.id}/in-progress`)
    : obj.history.push(`/bebidas/${obj.id}/in-progress`));
}

export function renderButton(showButton, showContinueButton, obj, updateProgress) {
  if (showButton && !showContinueButton) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => handleClick(obj, updateProgress) }
      >
        Iniciar Receita
      </button>
    );
  }
  if (showContinueButton) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => (obj.video ? obj.history.push(`/comidas/${obj.id}/in-progress`)
          : obj.history.push(`/bebidas/${obj.id}/in-progress`)) }
      >
        Continuar Receita
      </button>
    );
  }
  return undefined;
}
