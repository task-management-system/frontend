import { SET_GROUP, SET_STATUS } from 'redux/actionTypes';
import { ISetGroupAction, ISetStatusAction } from 'types/redux/actions';

export const setGroup = (payload: string): ISetGroupAction => ({
  type: SET_GROUP,
  payload,
});

export const setStatus = (payload: number): ISetStatusAction => ({
  type: SET_STATUS,
  payload,
});
