import { Notification } from 'types';
import { AddNotificationAction, RemoveNotificationAction } from '../actions/notifications';

export type Notifications = Notification[];

export type NotificationsAction = AddNotificationAction | RemoveNotificationAction;
