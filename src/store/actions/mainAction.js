import MainRequest from '../../apis/mainRequest';
import { CHANGE_AVATAR, CHANGE_BIO, CHANGE_USERNAME, GET_MAIN } from '../types';

const main = new MainRequest();

export const getMain = () => async (dispatch) => {
  let data = await main.getMain();
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
