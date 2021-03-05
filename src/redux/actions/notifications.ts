import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';
import { Notification } from 'types';
import { AddNotificationAction, RemoveNotificationAction } from 'types/redux/actions';

export const addNotification = (payload: Notification): AddNotificationAction => ({
  type: ADD_NOTIFICATION,
  payload,
});

export const removeNotification = (payload: string): RemoveNotificationAction => ({
  type: REMOVE_NOTIFICATION,
  payload,
});
