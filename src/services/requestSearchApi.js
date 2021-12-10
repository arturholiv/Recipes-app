const requestSearchApi = async (searchParams, currentPage) => {
  const { inputValue, ingredient, name, firstLetter } = searchParams;
  let searchMethod = { type: '', letter: '' };
  currentPage = currentPage.includes('comidas') ? 'themealdb' : 'thecocktaildb';

  searchMethod = ingredient ? { type: 'filter', letter: 'i' } : searchMethod;
  searchMethod = name ? { type: 'search', letter: 's' } : searchMethod;
  searchMethod = firstLetter ? { type: 'search', letter: 'f' } : searchMethod;

  const { type, letter } = searchMethod;

  const URL = `https://www.${currentPage}.com/api/json/v1/1/${type}.php?${letter}=${inputValue}`;

  try {
    const result = await fetch(URL)
      .then((response) => response.json()).then((resolve) => resolve);
    const key = currentPage === 'themealdb' ? 'meals' : 'drinks';
    return result[key];
  } catch (err) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
    return err;
  }
};

export default requestSearchApi;
