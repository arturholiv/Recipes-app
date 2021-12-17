import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';

function IngredienteCard({ ingrediente, index, type, numberOfIngredients }) {
  const [risked, setRisked] = useState('none');
  const [isChecked, setIsChecked] = useState(false);
  const { mealProgress,
    setMealProgress,
    // drinkProgress,
    // setdrinkProgress,
    setBtnFinalizeRecipe,
  } = useContext(AppContext);

  function verifyProgress() {
    // verifica se todos os checkbox  estão marcados para habilitar o botao finalizar
    const checkbox = document.querySelectorAll('.checkbox');
    console.log('funciona');
    let selecionados = 0;
    console.log(numberOfIngredients);

    checkbox.forEach((el) => {
      if (el.checked) {
        selecionados += 1;
      }
    });
    console.log('selecionados', selecionados);
    if (selecionados === numberOfIngredients) {
      console.log('entrou');
      setBtnFinalizeRecipe(false);
    } else if (selecionados < numberOfIngredients) {
      setBtnFinalizeRecipe(true);
    }
  }

  function handleClick({ target: { name } }) {
    console.log(name);
    if (risked === 'line-through') {
      setRisked('none');
    }
    if (risked === 'none') {
      setRisked('line-through');
    }
    if (isChecked === true) {
      setIsChecked(false);
      verifyProgress();
    } else {
      setIsChecked(true);
      if (type === 'meals') {
        setMealProgress([...mealProgress, index + 1]);
        // setLocalStorage();
        verifyProgress();
      }
    }
  }

  return (
    <div key={ ingrediente }>
      <h4
        data-testid={ `${index + 1}-ingredient-step` }
        style={ { textDecoration: risked } }
      >
        {ingrediente}
      </h4>
      <label htmlFor="check">
        <input
          className="checkbox"
          type="checkbox"
          name={ ingrediente }
          checked={ isChecked }
          onClick={ (e) => handleClick(e) }
        />
      </label>
    </div>);
}

IngredienteCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingrediente: PropTypes.string.isRequired,
  numberOfIngredients: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredienteCard;
