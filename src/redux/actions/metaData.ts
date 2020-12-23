import { UPDATE_AUTHORIZED } from 'redux/actionTypes';
import { TPayload } from 'redux/types';

export const updateAuthorized = (payload: TPayload) => ({
  type: UPDATE_AUTHORIZED,
  payload,
});
