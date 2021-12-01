import BlogRequest from '../../apis/blogRequest';
import { GET_BLOGS, SET_PAGE_COUNT } from '../types';

const blogRequest = new BlogRequest();

export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await blogRequest.getBlogs();
    dispatch({ type: GET_BLOGS, payload: data?.blogs });
    dispatch({ type: SET_PAGE_COUNT, payload: data?.page_count });
  } catch (e) {}
};
