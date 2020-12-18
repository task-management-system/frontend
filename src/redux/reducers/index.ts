import { combineReducers } from 'redux';
import metaData from './metaData';
import { TState, TAction } from '../types';
import { RESET_STORE } from '../actionTypes';

const appReducer = combineReducers({
  metaData,
});

const rootReducer = (state: TState | undefined, action: TAction) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
