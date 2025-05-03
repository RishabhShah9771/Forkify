import { API_URL, API_KEY } from './config.js';
import { getJSON, setJSON } from './helpers.js';
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
  bookmarks: [], // Stores bookmarked recipes
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id, // Recipe ID
    title: recipe.title, // Recipe title
    publisher: recipe.publisher, // Publisher of the recipe
    SourceUrl: recipe.source_url, // URL of the recipe source
    image: recipe.image_url, // URL of the recipe image
    servings: recipe.servings, // Number of servings
    cookingTime: recipe.cooking_time, // Cooking time in minutes
    ingredients: recipe.ingredients, // List of ingredients
  };
};

// Function to load a recipe by its ID
const loadRecipe = async function (id) {
  try {
    // Fetch recipe data from the API
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;

    // Transform and store the recipe data in the state
    state.recipe = createRecipeObject(data);

    // Check if the recipe is bookmarked and update the state
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    // Rethrow the error to be handled by the caller
    throw error;
  }
};

// Function to load search results based on a query
const loadSearchResults = async function (query) {
  try {
    // Update the search query in the state
    state.search.query = query;

    // Fetch search results from the API
    const data = await getJSON(`${API_URL}?search=${query}`);

    // Transform and store the search results in the state
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id, // Recipe ID
        title: recipe.title, // Recipe title
        publisher: recipe.publisher, // Publisher of the recipe
        image: recipe.image_url, // URL of the recipe image
      };
    });

    // Reset the current page to the default page
    state.search.page = DEFAULT_PAGE;
  } catch (error) {
    // Log the error and rethrow it
    throw error;
  }
};

// Function to get search results for a specific page
const getSearchResultsPage = function (page = state.search.page) {
  // Update the current page in the state
  state.search.page = page;

  // Calculate the start and end indices for slicing the results
  const startPageValue = (page - 1) * state.search.resultsPerPage;
  const endPageValue = page * state.search.resultsPerPage;

  // Return a slice of the results for the current page
  if (state.search.results.length === 0) return [];
  return state.search.results.slice(startPageValue, endPageValue);
};

// Function to update the servings and adjust ingredient quantities
const updateServings = function (newServings) {
  if (Array.isArray(state.recipe.ingredients)) {
    state.recipe.ingredients.forEach(ing => {
      // Adjust ingredient quantity based on the new servings
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
      // Formula: newQt = oldQt * newServings / oldServings
    });
  }

  // Update the servings in the state
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// Function to add a recipe to bookmarks
const addBookmark = function (recipe) {
  // Add the recipe to the bookmarks array
  state.bookmarks.push(recipe);

  // Mark the current recipe as bookmarked if it matches the recipe ID
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

// Function to delete a recipe from bookmarks
const deleteBookmark = function (id) {
  // Find the index of the bookmark to delete
  const index = state.bookmarks.findIndex(el => el.id === id);

  // Remove the bookmark from the bookmarks array
  state.bookmarks.splice(index, 1);

  // Mark the current recipe as not bookmarked if it matches the recipe ID
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
//clearBookmarks();

const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].replaceAll(' ', '').split(',');
        if (ingArray.length !== 3)
          throw new Error(
            `Wrong ingredient format! Please use the correct format !`
          );
        const [quantity, unit, description] = ingArray;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.SourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await setJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
  } catch (error) {
    throw error;
  }
};

// Export the state and functions for use in other modules
export {
  state, // Application state
  loadRecipe, // Function to load a recipe by ID
  loadSearchResults, // Function to load search results
  getSearchResultsPage, // Function to get search results for a specific page
  updateServings, // Function to update servings and adjust ingredients
  addBookmark, // Function to add a recipe to bookmarks
  deleteBookmark, // Function to delete a recipe from bookmarks
  uploadRecipe,
};
