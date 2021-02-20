import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';
import { INotification } from 'types';
import { TAction } from 'types/redux';

export const addNotification = (payload: INotification): TAction<INotification> => ({
  type: ADD_NOTIFICATION,
  payload,
});

export const removeNotification = (payload: number): TAction<number> => ({
  type: REMOVE_NOTIFICATION,
  payload,
});
