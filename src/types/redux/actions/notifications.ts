import { INotification } from 'types';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';

export interface IAddNotificationAction {
  type: typeof ADD_NOTIFICATION;
  payload: INotification;
}

export interface IRemoveNotificationAction {
  type: typeof REMOVE_NOTIFICATION;
  payload: string;
}
