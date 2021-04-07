import { combineReducers } from 'redux';
import metaData from './metaData';
import cache from './cache';
import tabs from './tabs';
import notifications from './notifications';
import users from './users';
import { State, Action } from 'types/redux';
import { RESET_STORE } from '../actionTypes';

const appReducer = combineReducers({
  metaData,
  cache,
  tabs,
  notifications,
  users,
});

const rootReducer = (state: State | undefined, action: any) => {
  if ((action as Action<null>).type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action as any);
};

export default rootReducer;
