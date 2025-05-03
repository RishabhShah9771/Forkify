// Import the base View class
import View from './view.js';
// Import the constant for the bookmark list element
import { BOOKMARK_LIST } from '../config.js';
// Import the previewView for rendering individual bookmarks
import previewView from './previewView.js';

// Define the BookmarksView class, extending the base View class
class BookmarksView extends View {
  // Parent element where bookmarks will be rendered
  _parentElement = BOOKMARK_LIST;
  // Error message to display when there are no bookmarks
  _errorMessage = 'No bookmarks yet! Find a nice recipe and bookmark it.';
  // Placeholder for any additional messages (currently unused)
  _message = '';

  // Generate the markup for the bookmarks list
  _generateMarkup() {
    // Map over the bookmarks data and render each bookmark using previewView
    // Join the resulting array of HTML strings into a single string
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

// Export an instance of the BookmarksView class
export default new BookmarksView();
