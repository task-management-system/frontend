import { Notification } from 'types';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';

export interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION;
  payload: Notification;
}

export interface RemoveNotificationAction {
  type: typeof REMOVE_NOTIFICATION;
  payload: string;
}
