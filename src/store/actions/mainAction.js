/* eslint-disable no-unused-vars */
import MainRequest from '../../apis/mainRequest';
import {
  ADD_SKILL,
  ADD_TIMELINE,
  CHANGE_AVATAR,
  CHANGE_BIO,
  CHANGE_SKILL,
  CHANGE_TIMELINE,
  CHANGE_USERNAME,
  GET_MAIN,
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY,
  SET_USER,
  SET_VERIFY,
} from '../types';
import BlogRequest from '../../apis/blogRequest';
import UserRequest from '../../apis/userRequest';
import { message } from 'antd';

const blog = new BlogRequest();
const main = new MainRequest();
const user = new UserRequest();

export const getMain = () => async (dispatch) => {
  let data = await main.getMain();
  let { data: cats } = await blog.getCategories();
  dispatch({ type: SET_CATEGORIES, payload: cats });
  // dispatch({ type: SET_CURRENT_CATEGORY, payload: cats[0] });

  dispatch({ type: GET_MAIN, payload: data });
};

export const changeAvatar = (file) => async (dispatch) => {
  let { data } = await main.changeAvatar(file);
  dispatch({ type: CHANGE_AVATAR, payload: data?.data?.avatar });
};

export const changeUsername = (username) => async (dispatch) => {
  await main.changeUsername(username);
  dispatch({ type: CHANGE_USERNAME, payload: username });
};

export const changeBio = (bio) => async (dispatch) => {
  await main.changeBio(bio);
  dispatch({ type: CHANGE_BIO, payload: bio });
};

export const changeSkill = (skill) => async (dispatch, getState) => {
  await main.changeSkill(skill);
  const { skills } = getState().main.data;
  const index = skills.findIndex((item) => item.id === skill.skill_id);
  skills[index] = skill;
  dispatch({ type: CHANGE_SKILL, payload: skills });
};

export const addSkill = (skill) => async (dispatch) => {
  let { data } = await main.addSkill(skill);
  dispatch({ type: ADD_SKILL, payload: data.data.skills.skills });
};

export const addTimeline = (timeline) => async (dispatch) => {
  let { data } = await main.addTimeline(timeline);
  dispatch({ type: ADD_TIMELINE, payload: data.data.timeline.timeline });
};

export const changeTimeline = (tl) => async (dispatch, getState) => {
  await main.changeTimeline(tl);
  const { timeline } = getState().main.data;
  const index = timeline.findIndex((item) => item.id === tl.timeline_id);
  timeline[index] = tl;
  dispatch({ type: CHANGE_TIMELINE, payload: timeline });
};

export const setAuthUser = () => async (dispatch, getState) => {
  try {
    const { token } = await getState().main;
    const result = await main.auth(token);
    if (result?.status === 0) {
      dispatch({ type: SET_VERIFY, payload: false });
      return;
    }
    dispatch({ type: SET_VERIFY, payload: true });
  } catch (e) {}
};

export const verificationUser = (vc, callback) => async (dispatch) => {
  try {
    const result = await user.verificationUser(vc);
    if (result?.status === 0) {
      message.warning(result?.error?.title || result?.error?.message);
    } else {
      await callback(result?.data);
      dispatch({ type: SET_VERIFY, payload: true });
      dispatch({ type: SET_USER, payload: result?.data?.token });
    }
  } catch (e) {}
};
