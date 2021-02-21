import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { TStore, TPersistState, IAction } from 'types/redux';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['metaData', 'cache'],
};

const store: TStore = createStore<TPersistState, IAction<any>, any, any>(
  persistReducer(persistConfig, rootReducer),
  process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(thunk, logger)
);

const persistor = persistStore(store);

export { store, persistor };
