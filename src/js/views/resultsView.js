// Import the base View class
import View from './view.js';

// Import icons for SVG usage
import icons from 'url:../../img/icons.svg';

// Import configuration constants
import { RESULTS_CONTAINER } from '../config.js';

// Define the ResultsView class, extending the base View class
class ResultsView extends View {
  // Parent element where the results will be rendered
  _parentElement = RESULTS_CONTAINER;

  // Default error message to display when no results are found
  _errorMessage = 'No recipes found for your query! Please try again';

  // Default success message (currently unused)
  _message = '';

  /**
   * Generate the markup for the entire results list
   * @returns {string} - HTML string for all results
   */
  _generateMarkup() {
    // Map over the data and generate markup for each result
    return this._data.map(this._generateMarkupPreview).join('');
  }

  /**
   * Generate the markup for a single result preview
   * @param {Object} results - The result object containing recipe details
   * @returns {string} - HTML string for a single result
   */
  _generateMarkupPreview(results) {
    const id = window.location.hash.slice(1);

    return ` 
     <li class="preview">
            <a class="preview__link ${
              results.id === id ? `preview__link--active` : ''
            }" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="${results.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}

// Export an instance of the ResultsView class
export default new ResultsView();
