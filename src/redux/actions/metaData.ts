import { SET_USER, SET_CLAIMS } from 'redux/actionTypes';
import { TPayload } from 'redux/types';

export const setUser = (payload: TPayload) => ({
  type: SET_USER,
  payload,
});

export const setClaims = (payload: TPayload) => ({
  type: SET_CLAIMS,
  payload,
});
