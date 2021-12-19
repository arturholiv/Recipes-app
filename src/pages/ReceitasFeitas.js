import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const [filter, setFilter] = useState('All');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [clipBoard, SetClipBoard] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [currentType, setCurrentType] = useState('');
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesStorage) {
      setDoneRecipes(doneRecipesStorage);
    }
  }, []);

  const handleChangeFilter = (event) => {
    const { target } = event;
    event.preventDefault();
    setFilter(target.innerText);
  };

  const history = useHistory();

  const recipeWithFilter = (currentFilter) => {
    switch (currentFilter) {
    case 'Food':
      return doneRecipes.filter((element) => element.type === 'comida');
    case 'Drinks':
      return doneRecipes.filter((element) => element.type === 'bebida');
    default:
      return doneRecipes;
    }
  };

  const handleCopyClipboard = (event) => {
    event.preventDefault();
    let name;
    if (event.target.name) {
      name = event.target.name;
    } else {
      name = event.target.parentNode.name;
    }
    name = name.split(',');
    SetClipBoard(true);
    navigator.clipboard.writeText(`http://localhost:3000/${`${name[0]}s`}/${name[1]}`);
  };

  const getIndex = (element) => recipeWithFilter(filter).indexOf(element);

  const getType = (type) => {
    setCurrentType(type === 'comida' ? 'comidas' : 'bebidas');
  };

  return (
    <div>
      <Header />
      <form>
        <button
          type="submit"
          data-testid="filter-by-all-btn"
          onClick={ (event) => handleChangeFilter(event) }
        >
          All
        </button>
        <button
          type="submit"
          data-testid="filter-by-food-btn"
          onClick={ (event) => handleChangeFilter(event) }
        >
          Food
        </button>
        <button
          type="submit"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleChangeFilter(event) }
        >
          Drinks
        </button>
        {recipeWithFilter(filter)
          && recipeWithFilter(filter).map((curr) => (
            <div key={ curr.id }>
              <button
                type="button"
                onClick={ () => {
                  getType(curr.type);
                  setCurrentId(curr.id);
                  setRedirect(true);
                } }
              >
                <img
                  src={ curr.image }
                  alt={ curr.name }
                  data-testid={ `${getIndex(curr)}-horizontal-image` }
                  id={ curr.name }
                  style={ { width: '25vw' } }
                />
              </button>
              {redirect && history.push(`/${currentType}/${currentId}`)}
              <p
                data-testid={ `${getIndex(curr)}-horizontal-top-text` }
              >
                {`${curr.area || curr.alcoholicOrNot} - ${curr.category}`}
              </p>
              <Link to={ `${curr.type}s/${curr.id}` }>
                <p
                  data-testid={ `${getIndex(curr)}-horizontal-name` }
                >
                  {curr.name}
                </p>
              </Link>
              <span
                data-testid={ `${getIndex(curr)}-horizontal-done-date` }
              >
                {curr.doneDate}
              </span>
              <button
                type="submit"
                data-testid={ `${getIndex(curr)}-horizontal-share-btn` }
                src="../images/shareIcon.svg"
                onClick={ (event) => handleCopyClipboard(event) }
                name={ `${curr.type},${curr.id}` }
              >
                <img src={ shareIcon } alt="share Icon" />
                {clipBoard && <p>Link copiado!</p>}
              </button>
              <div>
                {curr.tags.slice(0, 2).map((tag) => (
                  <p
                    key={ `${tag}-${curr.id}` }
                    data-testid={ `${getIndex(curr)}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>)) }
              </div>
            </div>))}
      </form>
    </div>
  );
  // return (
  //   <h1>Recipes</h1>
  // );
}

export default ReceitasFeitas;
