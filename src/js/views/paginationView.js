import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { PAGINATION_CONTAINER } from '../config.js';

class PaginationView extends View {
  // The parent element where pagination buttons will be rendered
  _parentElement = PAGINATION_CONTAINER;

  /**
   * Adds an event listener to handle clicks on pagination buttons.
   * @param {Function} handler - The function to handle the page change.
   */
  addHandlerCLick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      event.preventDefault();

      // Find the closest button with the class 'btn--inline'
      const btn = event.target.closest('.btn--inline');
      if (!btn) return; // If no button is clicked, exit the function

      // Extract the page number to navigate to from the button's dataset
      const goToPage = +btn.dataset.goto;

      // Call the handler function with the target page number
      handler(goToPage);
    });
  }

  /**
   * Generates the markup for pagination buttons based on the current page and total pages.
   * @returns {string} The HTML string for the pagination buttons.
   */
  _generateMarkup() {
    const currentPage = this._data.page; // Current active page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // Total number of pages

    // Case 1: Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      // Render only the "next" button
      return `<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Case 2: Last page
    if (currentPage === numPages && numPages > 1) {
      // Render only the "previous" button
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>`;
    }

    // Case 3: Any other page (middle pages)
    if (currentPage < numPages) {
      // Render both "previous" and "next" buttons
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Case 4: Page 1 and there are no other pages
    // Render nothing if there's only one page
    return '';
  }
}

export default new PaginationView();
