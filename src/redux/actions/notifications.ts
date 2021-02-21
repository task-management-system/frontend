import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';
import { INotification } from 'types';
import { IAddNotificationAction, IRemoveNotificationAction } from 'types/redux/actions';

export const addNotification = (payload: INotification): IAddNotificationAction => ({
  type: ADD_NOTIFICATION,
  payload,
});

export const removeNotification = (payload: string): IRemoveNotificationAction => ({
  type: REMOVE_NOTIFICATION,
  payload,
});
