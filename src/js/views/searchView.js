import { SEARCH_FORM } from '../config.js'; // Import the search form element from the configuration file

class SearchView {
  _parentElement = SEARCH_FORM; // The parent element for the search form

  // Method to get the search query from the input field
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value; // Get the value of the input field
    this.#clearInput(); // Clear the input field after retrieving the query
    return query; // Return the query string
  }

  // Method to add an event listener for the search form submission
  addHandleSearch(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
      handler(); // Call the handler function passed as an argument
    });
  }

  // Private method to clear the input field
  #clearInput() {
    this._parentElement.querySelector('.search__field').value = ''; // Set the input field value to an empty string
  }
}

// Export an instance of the SearchView class as the default export
export default new SearchView();
