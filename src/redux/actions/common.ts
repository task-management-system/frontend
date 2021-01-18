import { RESET_STORE } from 'redux/actionTypes';

export const reset = () => ({
  type: RESET_STORE,
  payload: null,
});
