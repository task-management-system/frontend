export interface IRole {
  power: number;
  text: string;
}

export interface IUser {
  username: string;
  // password?: string;
  name: string;
  email: string;
  role: IRole | null;
}

export interface IPermission {
  name: string;
  power: number;
  description: string;
}

export type TNotificationType = 'success' | 'error' | 'warning';

export interface INotification {
  id: string;
  type: TNotificationType;
  text: string;
}
