import { salt } from 'utils';
import { Notification, NotificationType, NotificationDetails } from 'types';

export const createNotification = (
  type: NotificationType,
  text: string,
  details?: NotificationDetails | null
): Notification => ({
  id: salt(),
  type: type.toLowerCase() as NotificationType,
  text,
  details: details || null,
});
