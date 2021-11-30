import { CHANGE_AVATAR, CHANGE_BIO, CHANGE_USERNAME, GET_MAIN } from '../types';

const INITSTATE = {
  data: {},
};

const mainReducer = (state = INITSTATE, action) => {
  switch (action.type) {
    case GET_MAIN:
      return { data: action.payload };
    case CHANGE_AVATAR:
      return { data: { ...state.data, avatar: action.payload } };
    case CHANGE_USERNAME:
      return {
        data: { ...state.data, username: action.payload },
      };
    case CHANGE_BIO:
      return {
        data: { ...state.data, bio: action.payload },
      };
    default:
      return state;
  }
};

export default mainReducer;
