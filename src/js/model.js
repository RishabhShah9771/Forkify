import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RESULTS_PER_PAGE, DEFAULT_PAGE } from './config.js';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: DEFAULT_PAGE,
  },
};

const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      SourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.error(`${error} 💥`);
    throw error;
  }
};

const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const startPageValue = (page - 1) * state.search.resultsPerPage;
  const endPageValue = page * state.search.resultsPerPage;

  if (state.search.results.length === 0) return [];
  return state.search.results.slice(startPageValue, endPageValue);
};

export { state, loadRecipe, loadSearchResults, getSearchResultsPage };
