import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { RESULTS_CONTAINER } from '../config.js';

class ResultsView extends View {
  _parentElement = RESULTS_CONTAINER;
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    return ` 
     <li class="preview">
            <a class="preview__link preview__link--active" href="#${results.id}">
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
export default new ResultsView();
