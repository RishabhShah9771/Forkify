import { SEARCH_FORM } from '../config.js';

class SearchView {
  _parentElement = SEARCH_FORM;

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  addHandleSearch(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
    });
  }

  #clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
