import { UPDATE_AUTHORIZED, SET_CLAIMS } from 'redux/actionTypes';
import { TPayload } from 'redux/types';

export const updateAuthorized = (payload: TPayload) => ({
  type: UPDATE_AUTHORIZED,
  payload,
});

export const setClaims = (payload: TPayload) => ({
  type: SET_CLAIMS,
  payload,
});
