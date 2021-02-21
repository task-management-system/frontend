import { INotification } from 'types';
import { IAddNotificationAction, IRemoveNotificationAction } from '../actions/notifications';

export type TNotifications = INotification[];

export type TNotificationsAction = IAddNotificationAction | IRemoveNotificationAction;
