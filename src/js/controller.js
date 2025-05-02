'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    // Get ID from URL
    const id = window.location.hash.slice(1);

    // Check if ID is valid
    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`${err}`);
  }
};

['hashchange', 'load'].forEach(ev => {
  window.addEventListener(ev, controlRecipe);
});
