import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

function IngredienteCard({ ingrediente, index, type, numberOfIngredients }) {
  const RISKED_PROPERTY = 'line-through';
  const [risked, setRisked] = useState('none');
  const [isChecked, setIsChecked] = useState(false);
  const {
    setBtnFinalizeRecipe,
    updateProgress,
    currentDrinkId,
    currentMealId,
  } = useContext(AppContext);

  function verifyProgress() {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress && type === 'cocktails') {
      const { cocktails } = progress;
      const recipeInProgress = Object.keys(cocktails)
        .some((id) => id === (currentDrinkId.toString()));
      if (recipeInProgress) {
        const ingredientAlreadyDone = cocktails[currentDrinkId]
          .some((i) => i === (index).toString());
        setIsChecked(ingredientAlreadyDone);

        const isRisked = ingredientAlreadyDone ? RISKED_PROPERTY : 'none';
        setRisked(isRisked);
      }
    }
    if (progress && type === 'meals') {
      const { meals } = progress;
      const recipeInProgress = Object.keys(meals).some((id) => id === currentMealId);
      const ingredientAlreadyDone = meals[currentMealId]
        .some((i) => i === (index).toString());
      if (recipeInProgress && ingredientAlreadyDone) {
        setIsChecked(ingredientAlreadyDone);
        const isRisked = ingredientAlreadyDone ? RISKED_PROPERTY : 'none';
        setRisked(isRisked);
      }
    }
  }

  useEffect(() => {
    verifyProgress();
  }, []);

  function verifyIfIsDone() {
    // verifica se todos os checkbox  estão marcados para habilitar o botao finalizar
    const checkbox = document.querySelectorAll('.checkbox');
    console.log(checkbox);
    let selecionados = 0;

    checkbox.forEach((el) => {
      if (el.checked) {
        selecionados += 1;
      }
    });
    if (selecionados === numberOfIngredients) {
      setBtnFinalizeRecipe(false);
    } else if (selecionados < numberOfIngredients) {
      setBtnFinalizeRecipe(true);
    }
  }

  function handleClick({ target: { name } }) {
    if (risked === RISKED_PROPERTY) {
      setRisked('none');
    }
    if (risked === 'none') {
      setRisked(RISKED_PROPERTY);
    }
    if (isChecked === true) {
      setIsChecked(false);
      verifyIfIsDone();
    } else {
      // const recipeType = type;
      setIsChecked(true);
      verifyIfIsDone();
      updateProgress(name, type);
    }
  }

  function renderCheckbox() {
    if (isChecked) {
      return (
        <label htmlFor="ingrediente">
          <input
            id="ingrediente"
            className="checkbox"
            type="checkbox"
            name={ index }
            checked
            onClick={ (e) => handleClick(e) }
          />
        </label>
      );
    }
    return (

      <input
        className="checkbox"
        type="checkbox"
        name={ index }
        onClick={ (e) => handleClick(e) }
      />

    );
  }

  return (
    <div>
      <h4
        data-testid={ `${index}-ingredient-step` }
        style={ { textDecoration: risked } }
      >
        {ingrediente}
        {renderCheckbox()}
      </h4>

    </div>);
}

IngredienteCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingrediente: PropTypes.string.isRequired,
  numberOfIngredients: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredienteCard;
