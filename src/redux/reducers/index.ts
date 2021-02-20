import { combineReducers } from 'redux';
import metaData from './metaData';
import notifications from './notifications';
import cache from './cache';
import { TState, TAction } from 'types/redux';
import { RESET_STORE } from '../actionTypes';

const appReducer = combineReducers({
  metaData,
  notifications,
  cache,
});

const rootReducer = (state: TState | undefined, action: TAction<any>) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
