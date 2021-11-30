import MainRequest from '../../apis/mainRequest';
import { GET_MAIN } from '../types';

const main = new MainRequest();

export const getMain = () => async (dispatch) => {
  let data = await main.getMain();
  dispatch({ type: GET_MAIN, payload: data });
};
