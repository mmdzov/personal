import BlogRequest from '../../apis/blogRequest';
import {
  GET_BLOGS,
  GET_TAGS,
  SET_BLOG,
  SET_CURRENT_CATEGORY,
  SET_PAGE,
  SET_PAGE_COUNT,
  SET_POST_IMAGE,
  UNSET_BLOG,
} from '../types';

const blogRequest = new BlogRequest();

export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await blogRequest.getBlogs();
    dispatch({ type: GET_BLOGS, payload: data?.blogs });
    dispatch({ type: SET_PAGE_COUNT, payload: data?.page_count });
    dispatch({ type: SET_CURRENT_CATEGORY, payload: 'all' });
    dispatch({ type: SET_PAGE, payload: 1 });
  } catch (e) {}
};

export const getTags = () => async (dispatch) => {
  try {
    const { data } = await blogRequest.getTags();
    dispatch({ type: GET_TAGS, payload: data });
  } catch (e) {}
};

export const setPostImage = (file) => async (dispatch, getState) => {
  try {
    const { data } = await blogRequest.addPostImage(file);
    const images = getState().blogs.post_images;
    images.push(data);
    dispatch({ type: SET_POST_IMAGE, payload: images });
  } catch (e) {}
};

export const addBlog =
  (blog, navigate = () => {}) =>
  async (dispatch) => {
    const { data } = await blogRequest.addBlog(blog);
    dispatch({ type: SET_BLOG, payload: data });
    navigate(`/blog/${data?._id}`);
  };

export const unsetBlog = () => (dispatch) => {
  dispatch({ type: UNSET_BLOG, payload: {} });
};

export const getBlogsByCategory = (category, page) => async (dispatch) => {
  const { data } = await blogRequest.getBlogsByCategory(category.split(' ').join('-'), page);
  dispatch({ type: GET_BLOGS, payload: data?.blogs });
  dispatch({ type: SET_PAGE_COUNT, payload: data?.page_count });
  dispatch({ type: SET_CURRENT_CATEGORY, payload: category });
  dispatch({ type: SET_PAGE, payload: page });
};
