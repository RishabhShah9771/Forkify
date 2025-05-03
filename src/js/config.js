const API_URL = 'https://forkify-api.jonas.io/api/v2/recipes';
const TIMEOUT_SEC = 10;
const RECIPE_CONTAINER = document.querySelector('.recipe');
const SEARCH_FORM = document.querySelector('.search');
const RESULTS_CONTAINER = document.querySelector('.results');
const RESULTS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const PAGINATION_CONTAINER = document.querySelector('.pagination');
const BOOKMARK_LIST = document.querySelector('.bookmarks__list');

export {
  API_URL,
  TIMEOUT_SEC,
  RECIPE_CONTAINER,
  SEARCH_FORM,
  RESULTS_CONTAINER,
  RESULTS_PER_PAGE,
  DEFAULT_PAGE,
  PAGINATION_CONTAINER,
  BOOKMARK_LIST,
};
