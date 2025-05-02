import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { PAGINATION_CONTAINER } from '../config.js';

class PaginationView extends View {
  _parentElement = PAGINATION_CONTAINER;

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `<button class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>`;
    }

    // Other Page
    if (currentPage < numPages) {
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // Page 1 and there are no other pages
    return '';
  }
}
export default new PaginationView();
