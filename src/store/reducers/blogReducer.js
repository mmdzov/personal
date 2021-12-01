import {
  GET_BLOGS,
  GET_TAGS,
  SET_BLOG,
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY,
  SET_PAGE,
  SET_PAGE_COUNT,
  SET_POST_IMAGE,
  UNSET_BLOG,
} from '../types';

const INITSTATE = {
  list: [],
  page: 1,
  page_count: 1,
  categories: [],
  current_category: {},
  tags: [],
  post_images: [],
  blog: {},
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
    case GET_TAGS:
      return { ...state, tags: action.payload };
    case SET_POST_IMAGE:
      return { ...state, post_images: action.payload };
    case SET_BLOG:
      return { ...state, blog: action.payload };
    case UNSET_BLOG:
      return { ...state, blog: action.payload };
    default:
      return state;
  }
};

export default blogReducer;
