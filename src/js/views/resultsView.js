// Import the base View class
import View from './view.js';
// Import the RESULTS_CONTAINER constant from the config file
import { RESULTS_CONTAINER } from '../config.js';
// Import the previewView module for rendering individual preview items
import previewView from './previewView.js';

// Define the ResultsView class, extending the base View class
class ResultsView extends View {
  // Set the parent element where the results will be rendered
  _parentElement = RESULTS_CONTAINER;
  // Default error message to display when no recipes are found
  _errorMessage = 'No recipes found for your query! Please try again';
  // Default message (currently unused)
  _message = '';

  // Generate the markup for the results by mapping over the data
  // and rendering each result using the previewView
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

// Export an instance of the ResultsView class as the default export
export default new ResultsView();
