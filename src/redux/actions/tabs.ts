import { SET_GROUP, SET_STATUS } from 'redux/actionTypes';
import { SetGroupAction, SetStatusAction } from 'types/redux/actions';

export const setGroup = (payload: string): SetGroupAction => ({
  type: SET_GROUP,
  payload,
});

export const setStatus = (payload: number): SetStatusAction => ({
  type: SET_STATUS,
  payload,
});
