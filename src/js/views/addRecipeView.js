import View from './view.js';
import icons from 'url:../../img/icons.svg';
import {
  BTN_CLOSE_MODAL,
  BTN_OPEN_MODAL,
  MODAL_WINDOW_ELEMENT,
  MODAL_OVERLAY_ELEMENT,
  MODAL_PARENT_ELEMENT,
} from '../config.js';

class AddRecipeView extends View {
  // The parent element where pagination buttons will be rendered
  _parentElement = MODAL_PARENT_ELEMENT;
  _window = MODAL_WINDOW_ELEMENT;
  _overlay = MODAL_OVERLAY_ELEMENT;
  _btnOpen = BTN_OPEN_MODAL;
    _btnClose = BTN_CLOSE_MODAL;
    

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
