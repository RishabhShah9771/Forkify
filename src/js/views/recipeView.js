// Importing necessary modules and assets
import icons from 'url:../../img/icons.svg'; // Importing icons for SVG usage
import { RECIPE_CONTAINER } from '../config.js'; // Importing recipe container configuration
import { Fraction } from 'fraction.js'; // Importing Fraction library for fractional calculations
import View from './view.js'; // Importing base View class

// RecipeView class extending the base View class
class RecipeView extends View {
  // Parent element where the recipe will be rendered
  _parentElement = RECIPE_CONTAINER;

  // Default error message to display when a recipe is not found
  _errorMessage = 'We could not find that recipe. Please try another one!';

  // Default success message (currently unused)
  _message = '';

  /**
   * Adds event listeners for rendering the recipe when the hash changes or the page loads.
   * @param {Function} handler - The handler function to execute on events.
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  /**
   * Generates the markup for the recipe view.
   * @returns {string} - The HTML string for the recipe view.
   */
  _generateMarkup() {
    return `<figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <!-- Recipe cooking time -->
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <!-- Recipe servings -->
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <!-- Buttons to increase or decrease servings -->
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <!-- User-generated recipe icon -->
          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>

          <!-- Bookmark button -->
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <!-- Recipe ingredients -->
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </div>

        <!-- Recipe directions -->
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  /**
   * Generates the markup for a single ingredient.
   * @param {Object} ingredients - The ingredient object containing quantity, unit, and description.
   * @returns {string} - The HTML string for the ingredient.
   */
  _generateMarkupIngredient(ingredients) {
    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ingredients.quantity
                  ? new Fraction(ingredients.quantity).toString()
                  : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredients.unit}</span>
          ${ingredients.description}
              </div>
            </li>`;
  }
}

// Exporting an instance of RecipeView
export default new RecipeView();
