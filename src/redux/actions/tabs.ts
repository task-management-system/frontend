import { SET_GROUP, SET_STATUS, RESET_STATUS } from 'redux/actionTypes';
import { SetGroupAction, SetStatusAction, ResetStatusAction } from 'types/redux/actions';

export const setGroup = (payload: string): SetGroupAction => ({
  type: SET_GROUP,
  payload,
});

export const setStatus = (payload: number): SetStatusAction => ({
  type: SET_STATUS,
  payload,
});

export const resetStatus = (): ResetStatusAction => ({
  type: RESET_STATUS,
  payload: null,
});
