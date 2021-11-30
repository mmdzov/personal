import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers/combine';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
