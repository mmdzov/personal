import {
  GET_BLOGS,
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY,
  SET_PAGE,
  SET_PAGE_COUNT,
} from '../types';

const INITSTATE = {
  list: [],
  page: 1,
  page_count: 1,
  categories: [],
  current_category: {},
};

const blogReducer = (state = INITSTATE, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return { ...state, list: action.payload };
    case SET_PAGE_COUNT:
      return { ...state, page_count: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_CURRENT_CATEGORY:
      return { ...state, current_category: action.payload };
    default:
      return state;
  }
};

export default blogReducer;
