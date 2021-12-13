import { message } from 'antd';
import BlogRequest from '../../apis/blogRequest';
import {
  GET_BLOGS,
  GET_TAGS,
  LIKE_POST,
  SET_BLOG,
  SET_COMMENT,
  SET_COMMENT_REPLY,
  SET_CURRENT_CATEGORY,
  SET_PAGE,
  SET_PAGE_COUNT,
  SET_POST_IMAGE,
  UNSET_BLOG,
} from '../types';

const blogRequest = new BlogRequest();

export const getBlogs =
  (page = 1) =>
  async (dispatch) => {
    try {
      const { data } = await blogRequest.getBlogs(page);
      dispatch({ type: GET_BLOGS, payload: data?.blogs });
      dispatch({ type: SET_PAGE_COUNT, payload: data?.page_count });
      dispatch({ type: SET_CURRENT_CATEGORY, payload: 'all' });
      dispatch({ type: SET_PAGE, payload: page });
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

export const searchTags = (tag) => async (dispatch) => {
  const { data } = await blogRequest.searchTag(tag);
  dispatch({ type: GET_TAGS, payload: data });
};

export const getBlogsByTag = (tag) => async (dispatch) => {
  const { data } = await blogRequest.getBlogsByTag(tag);
  dispatch({ type: GET_BLOGS, payload: data });
};

export const getSingleBlog = (id) => async (dispatch) => {
  const { data } = await blogRequest.getSingleBlog(id);
  dispatch({ type: SET_BLOG, payload: data });
};

export const setBlogLike = (id, like) => async (dispatch, getState) => {
  const { status, error } = await blogRequest.likeBlogpost(id, like);
  if (status === 0) {
    message.warning(error?.title ?? error?.message);
    return;
  }
  const { blog } = getState().blogs;
  blog.liked = !!like;
  blog.likes = like ? blog.likes + 1 : blog.likes - 1;
  dispatch({ type: LIKE_POST, payload: blog });
};

export const setCommentReply = (id, comment) => async (dispatch, getState) => {
  const { data, status, error } = await blogRequest.replyComment(id, comment);
  if (status === 0) {
    message.warning(error?.title ?? error?.message);
    return;
  }
  const { blog } = getState().blogs;
  const commentIndex = blog.comments.findIndex((item) => item?.id === comment.comment_parent_id);
  blog.comments[commentIndex].replies.push(data);
  dispatch({ type: SET_COMMENT_REPLY, payload: blog });
};

export const setComment = (id, comment) => async (dispatch, getState) => {
  const { data, status, error } = await blogRequest.addComment(id, comment);
  if (status === 0) {
    message.warning(error?.title ?? error?.message);
    return;
  }
  const { blog } = getState()?.blogs;
  blog.comments.unshift(data);
  dispatch({ type: SET_COMMENT, payload: blog });
};
