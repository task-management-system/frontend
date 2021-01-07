export interface IClaim {
  name: string;
  power: number;
  text: string;
}

export type TNotificationType = 'success' | 'error' | 'warning';

export interface INotification {
  id: string;
  type: TNotificationType;
  text: string;
}
