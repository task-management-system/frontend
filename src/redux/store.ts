import { createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { AppStore, PersisState, Action } from 'types/redux';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['metaData', 'cache', 'tabs'],
};

const middleware: Middleware<unknown>[] = [thunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(require('redux-logger').default);
}

const store: AppStore = createStore<PersisState, Action<any>, any, any>(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };
