import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import mainReducer from './mainReducer';

const combinedReducers = combineReducers({
  main: mainReducer,
  blogs: blogReducer,
});

export default combinedReducers;
