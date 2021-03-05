import { salt } from 'utils';
import { Notification, NotificationType } from 'types';

export const createNotification = (type: NotificationType, text: string): Notification => ({
  id: salt(),
  type: type.toLowerCase() as NotificationType,
  text,
});
