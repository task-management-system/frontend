import { combineReducers } from 'redux';
import metaData from './metaData';
import notifications from './notifications';
import cache from './cache';
import tabs from './tabs';
import { TState, IAction } from 'types/redux';
import { RESET_STORE } from '../actionTypes';

const appReducer = combineReducers({
  metaData,
  notifications,
  cache,
  tabs,
});

const rootReducer = (state: TState | undefined, action: any) => {
  if ((action as IAction<null>).type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action as any);
};

export default rootReducer;
