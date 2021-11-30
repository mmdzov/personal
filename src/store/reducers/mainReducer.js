import { GET_MAIN } from '../types';

const INITSTATE = {
  data: {},
};

const mainReducer = (state = INITSTATE, action) => {
  switch (action.type) {
    case GET_MAIN:
      return { data: action.payload };
    default:
      return state;
  }
};

export default mainReducer;
