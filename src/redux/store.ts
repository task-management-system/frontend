import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';
import { TStore } from './types';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['metaData'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore<TStore, any, any, any>(
  persistedReducer,
  process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(thunk, logger)
);

const persistor = persistStore(store);

export { store, persistor };
