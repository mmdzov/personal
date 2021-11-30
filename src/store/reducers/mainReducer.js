import {
  ADD_SKILL,
  ADD_TIMELINE,
  CHANGE_AVATAR,
  CHANGE_BIO,
  CHANGE_SKILL,
  CHANGE_TIMELINE,
  CHANGE_USERNAME,
  GET_MAIN,
} from '../types';

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

    case CHANGE_SKILL:
      return {
        data: { ...state.data, skills: action.payload },
      };

    case ADD_SKILL:
      return {
        data: { ...state.data, skills: action.payload },
      };

    case ADD_TIMELINE:
      return {
        data: { ...state.data, timeline: action.payload },
      };

    case CHANGE_TIMELINE:
      return {
        data: { ...state.data, timeline: action.payload },
      };
    default:
      return state;
  }
};

export default mainReducer;
