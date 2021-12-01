import BlogRequest from '../../apis/blogRequest';
import { GET_BLOGS, GET_TAGS, SET_PAGE_COUNT, SET_POST_IMAGE } from '../types';

const blogRequest = new BlogRequest();

export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await blogRequest.getBlogs();
    dispatch({ type: GET_BLOGS, payload: data?.blogs });
    dispatch({ type: SET_PAGE_COUNT, payload: data?.page_count });
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
