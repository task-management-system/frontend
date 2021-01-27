import { SET_USER, SET_PERMISSIONS } from 'redux/actionTypes';
import { TPayload } from 'types/redux';

export const setUser = (payload: TPayload) => ({
  type: SET_USER,
  payload,
});

export const setPermissions = (payload: TPayload) => ({
  type: SET_PERMISSIONS,
  payload,
});
