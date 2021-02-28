import { SET_GROUP, SET_STATUS } from 'redux/actionTypes';

export interface ISetGroupAction {
  type: typeof SET_GROUP;
  payload: string;
}

export interface ISetStatusAction {
  type: typeof SET_STATUS;
  payload: number;
}
