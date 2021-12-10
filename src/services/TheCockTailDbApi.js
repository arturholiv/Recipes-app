const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const CATEGORIES_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export async function requestCocktailDbApi(category) {
  if (category) {
    const request = await fetch(`${DRINKS_BY_CATEGORY}${category}`);
    const requestJson = await request.json();
    const { drinks } = requestJson;
    return drinks;
  }
  const request = await fetch(ENDPOINT);
  const requestJson = request.json();
  const { drinks } = await requestJson;
  return drinks;
}

export async function requestDrinkCategory() {
  const request = await fetch(CATEGORIES_ENDPOINT);
  const requestJson = await request.json();
  const { drinks } = requestJson;
  return drinks;
}
