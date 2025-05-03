import icons from 'url:../../img/icons.svg'; // Importing icons for use in SVG elements

class View {
  _data; // Placeholder for the data to be rendered

  /**
   * Render the provided data to the DOM
   * @param {Object|Array} data - The data to be rendered
   */
  render(data) {
    // If no data is provided or the data is an empty array, render an error message
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // Store the data in the instance
    const markup = this._generateMarkup(); // Generate the HTML markup based on the data
    this._clear(); // Clear the parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert the generated markup into the DOM
  }

  /**
   * Update the DOM with new data without re-rendering the entire view
   * @param {Object|Array} data - The new data to update the view
   */
  update(data) {
    this._data = data; // Store the data in the instance
    const newMarkup = this._generateMarkup(); // Generate the HTML markup based on the new data

    // Create a virtual DOM from the new markup
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Get all elements from the new DOM
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    ); // Get all elements from the current DOM

    // Compare new elements with current elements and update only the changed parts
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      // Update text content if it has changed
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update attributes if they have changed
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  /**
   * Clear the content of the parent element
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render a spinner (loading indicator) in the parent element
   */
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

  /**
   * Render a success message in the parent element
   * @param {string} [message=this._message] - The success message to display
   */
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

  /**
   * Render an error message in the parent element
   * @param {string} [message=this._errorMessage] - The error message to display
   */
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
