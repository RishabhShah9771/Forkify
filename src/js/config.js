const API_URL = 'https://forkify-api.jonas.io/api/v2/recipes';
const API_KEY = '5f490151-ddd3-4563-b1c7-267dfc5e3b46';
const TIMEOUT_SEC = 10;
const RECIPE_CONTAINER = document.querySelector('.recipe');
const SEARCH_FORM = document.querySelector('.search');
const RESULTS_CONTAINER = document.querySelector('.results');
const RESULTS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const PAGINATION_CONTAINER = document.querySelector('.pagination');
const BOOKMARK_LIST = document.querySelector('.bookmarks__list');

// Modal Elements
const MODAL_PARENT_ELEMENT = document.querySelector('.upload');
const MODAL_OVERLAY_ELEMENT = document.querySelector('.overlay');
const MODAL_WINDOW_ELEMENT = document.querySelector('.add-recipe-window');
const BTN_OPEN_MODAL = document.querySelector('.nav__btn--add-recipe');
const BTN_CLOSE_MODAL = document.querySelector('.btn--close-modal');

export {
  API_URL,
  API_KEY,
  TIMEOUT_SEC,
  RECIPE_CONTAINER,
  SEARCH_FORM,
  RESULTS_CONTAINER,
  RESULTS_PER_PAGE,
  DEFAULT_PAGE,
  PAGINATION_CONTAINER,
  BOOKMARK_LIST,
  MODAL_PARENT_ELEMENT,
  MODAL_OVERLAY_ELEMENT,
  MODAL_WINDOW_ELEMENT,
  BTN_CLOSE_MODAL,
  BTN_OPEN_MODAL,
};
