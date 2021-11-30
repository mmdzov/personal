import { CHANGE_AVATAR, GET_MAIN } from '../types';

const INITSTATE = {
  data: {},
};

const mainReducer = (state = INITSTATE, action) => {
  switch (action.type) {
    case GET_MAIN:
      return { data: action.payload };
    case CHANGE_AVATAR:
      return { data: { ...state.data, avatar: action.payload } };
    default:
      return state;
  }
};

export default mainReducer;
