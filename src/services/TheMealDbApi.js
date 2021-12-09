const RECIPES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const RECIPES_BY_CATEGORY = 'www.themealdb.com/api/json/v1/1/filter.php?c=';
const CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export async function requestMealDbApi(category) {
  if (category) {
    console.log('entrei no if');
    console.log(`${RECIPES_BY_CATEGORY}${category}`);
    const request = await fetch(`${RECIPES_BY_CATEGORY}${category}`);
    const requestJson = await request.json();
    console.log(requestJson);
    // const { meals } = requestJson;
    // return meals;
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
