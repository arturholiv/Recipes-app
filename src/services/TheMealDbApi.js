const RECIPES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const RECIPES_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const RECIPES_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export async function requestMealDbApi(category) {
  if (category) {
    const request = await fetch(`${RECIPES_BY_CATEGORY}${category}`);
    const requestJson = await request.json();
    console.log(requestJson);
    const { meals } = requestJson;
    return meals;
  }
  const request = await fetch(RECIPES_ENDPOINT);
  const requestJson = await request.json();
  const { meals } = requestJson;
  return meals;
}

export async function requestMealCategory() {
  const request = await fetch(CATEGORIES_ENDPOINT);
  const requestJson = await request.json();
  const { meals } = requestJson;
  return meals;
}

export async function requestMealById(id) {
  const response = await fetch(`${RECIPES_BY_ID}${id}`);
  const responseJson = await response.json();
  const { meals } = responseJson;
  return meals;
}
