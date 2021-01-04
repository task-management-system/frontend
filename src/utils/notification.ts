import { salt } from 'utils';
import { INotification, TNotificationType } from 'redux/types';

export const createNotification = (type: TNotificationType, text: string): INotification => ({
  id: salt(),
  type: type.toLowerCase() as TNotificationType,
  text,
});
