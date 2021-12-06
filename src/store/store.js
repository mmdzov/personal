import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers/combine';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'main',
  storage,
};

const persistedReduce = persistReducer(persistConfig, combinedReducers);

const store = createStore(persistedReduce, composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { persistor, store };
