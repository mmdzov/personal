import MainRequest from '../../apis/mainRequest';
import { CHANGE_AVATAR, GET_MAIN } from '../types';

const main = new MainRequest();

export const getMain = () => async (dispatch) => {
  let data = await main.getMain();
  dispatch({ type: GET_MAIN, payload: data });
};

export const changeAvatar = (file) => async (dispatch) => {
  let { data } = await main.changeAvatar(file);
  dispatch({ type: CHANGE_AVATAR, payload: data?.data?.avatar });
};
