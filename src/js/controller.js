'use strict';

import 'core-js/stable'; // Polyfilling modern JavaScript features
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import * as model from './model.js'; // Importing the model for state management
import recipeView from './views/recipeView.js'; // Importing the recipe view
import searchView from './views/searchView.js'; // Importing the search view
import resultsView from './views/resultsView.js'; // Importing the results view
import paginationView from './views/paginationView.js'; // Importing the pagination view

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); // Get the recipe ID from the URL hash

    if (!id) return; // If no ID, exit the function
    recipeView.renderSpinner(); // Render a loading spinner

    // Updating results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id); // Load the recipe data

    recipeView.render(model.state.recipe); // Render the recipe
  } catch (error) {
    recipeView.renderError(); // Render an error message
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner(); // Render a loading spinner
    const query = searchView.getQuery(); // Get the search query
    if (!query) return; // If no query, exit the function
    await model.loadSearchResults(query); // Load search results
    resultsView.render(model.getSearchResultsPage()); // Render the search results
    paginationView.render(model.state.search); // Render the pagination
  } catch (error) {
    resultsView.renderError(); // Render an error message
  }
};

const controlPagination = function (goToPage) {
  // Render the search results for the specified page
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render the updated pagination buttons
  paginationView.render(model.state.search);
  // Scroll to the top of the page smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view with the new servings
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove a bookmark for the current recipe
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe); // Log the updated recipe state
  recipeView.update(model.state.recipe); // Update the recipe view
};

const init = function () {
  // Initialize event handlers for rendering the recipe
  recipeView.addHandlerRender(controlRecipe);
  // Initialize event handlers for updating servings
  recipeView.addHandlerUpdateServings(controlServings);
  // Initialize event handlers for adding/removing bookmarks
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  // Initialize event handlers for search functionality
  searchView.addHandleSearch(controlSearchResults);
  // Initialize event handlers for pagination
  paginationView.addHandlerCLick(controlPagination);
};
init(); // Start the application
