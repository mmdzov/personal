import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const combinedReducers = combineReducers({
  main: mainReducer,
});

export default combinedReducers;
