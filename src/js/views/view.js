import icons from 'url:../../img/icons.svg'; // Importing icons for use in SVG elements

class View {
  _data; // Placeholder for the data to be rendered

  // Render the provided data to the DOM
  render(data) {
    // If no data is provided or the data is an empty array, render an error message
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // Store the data in the instance
    const markup = this._generateMarkup(); // Generate the HTML markup based on the data
    this._clear(); // Clear the parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert the generated markup into the DOM
  }

  // Clear the content of the parent element
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Render a spinner (loading indicator) in the parent element
  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._parentElement.innerHTML = ''; // Clear the parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert the spinner markup
  }

  // Render a success message in the parent element
  renderMessage(message = this._message) {
    const markup = `<div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear(); // Clear the parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert the message markup
  }

  // Render an error message in the parent element
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear(); // Clear the parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert the error message markup
  }
}

export default View; // Export the View class as the default export
