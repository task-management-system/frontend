import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';
import { TPayload } from 'redux/types';

export const addNotification = (payload: TPayload) => ({
  type: ADD_NOTIFICATION,
  payload,
});

export const removeNotification = (payload: TPayload) => ({
  type: REMOVE_NOTIFICATION,
  payload,
});
