import { SET_GROUP, SET_STATUS, RESET_STATUS } from 'redux/actionTypes';

export interface SetGroupAction {
  type: typeof SET_GROUP;
  payload: string;
}

export interface SetStatusAction {
  type: typeof SET_STATUS;
  payload: number;
}

export interface ResetStatusAction {
  type: typeof RESET_STATUS;
  payload: null;
}
