import {
  ADD_SKILL,
  ADD_TIMELINE,
  CHANGE_AVATAR,
  CHANGE_BIO,
  CHANGE_SKILL,
  CHANGE_TIMELINE,
  CHANGE_USERNAME,
  GET_MAIN,
  SET_USER,
  SET_VERIFY,
} from '../types';

const INITSTATE = {
  data: {},
  verified: false,
  // token:
  // 'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWEzOWRjMzA4MWE2MjVmZWRkY2VmNjYiLCJpc0FkbWluIjp0cnVlLCJhdmF0YXIiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAvYXBpL3VwbG9hZHMvYXZhdGFyLWVzc2Zydm9nN3kuanBnIiwidXNlcm5hbWUiOiJtb2hhbW1hZCIsImVtYWlsIjoibXpvdjkzOUBnbWFpbC5jb20iLCJfX3YiOjB9.hkyABfU_Ba_zbuUjlABm1IvSOc6p17EJcm4kTK6rdvk',
  token: '',
};

const mainReducer = (state = INITSTATE, action) => {
  switch (action.type) {
    case GET_MAIN:
      return { ...state, data: action.payload };

    case CHANGE_AVATAR:
      return { ...state, data: { ...state.data, avatar: action.payload } };

    case CHANGE_USERNAME:
      return { ...state, data: { ...state.data, username: action.payload } };

    case CHANGE_BIO:
      return { ...state, data: { ...state.data, bio: action.payload } };

    case CHANGE_SKILL:
      return { ...state, data: { ...state.data, skills: action.payload } };

    case ADD_SKILL:
      return { ...state, data: { ...state.data, skills: action.payload } };

    case ADD_TIMELINE:
      return { ...state, data: { ...state.data, timeline: action.payload } };

    case CHANGE_TIMELINE:
      return { ...state, data: { ...state.data, timeline: action.payload } };

    case SET_VERIFY:
      return {
        ...state,
        verified: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
