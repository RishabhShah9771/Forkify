import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RESULTS_PER_PAGE, DEFAULT_PAGE } from './config.js';

// State object to store application data
const state = {
  recipe: {}, // Stores the currently loaded recipe
  search: {
    query: '', // Stores the current search query
    results: [], // Stores the search results
    resultsPerPage: RESULTS_PER_PAGE, // Number of results per page
    page: DEFAULT_PAGE, // Current page number
  },
};

// Function to load a recipe by its ID
const loadRecipe = async function (id) {
  try {
    // Fetch recipe data from the API
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;

    // Transform and store the recipe data in the state
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      SourceUrl: recipe.source_url, // URL of the recipe source
      image: recipe.image_url, // URL of the recipe image
      servings: recipe.servings, // Number of servings
      cookingTime: recipe.cooking_time, // Cooking time in minutes
      ingredients: recipe.ingredients, // List of ingredients
    };
  } catch (error) {
    // Rethrow the error to be handled by the caller
    throw error;
  }
};

// Function to load search results based on a query
const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // Update the search query in the state

    // Fetch search results from the API
    const data = await getJSON(`${API_URL}?search=${query}`);

    // Transform and store the search results in the state
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url, // URL of the recipe image
      };
    });
  } catch (error) {
    // Log the error and rethrow it
    console.error(`${error} 💥`);
    throw error;
  }
};

// Function to get search results for a specific page
const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page; // Update the current page in the state

  // Calculate the start and end indices for slicing the results
  const startPageValue = (page - 1) * state.search.resultsPerPage;
  const endPageValue = page * state.search.resultsPerPage;

  // Return a slice of the results for the current page
  if (state.search.results.length === 0) return [];
  return state.search.results.slice(startPageValue, endPageValue);
};

// Export the state and functions for use in other modules
export { state, loadRecipe, loadSearchResults, getSearchResultsPage };
