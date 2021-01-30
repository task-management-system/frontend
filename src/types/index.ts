export interface IRole {
  id: number;
  power: number;
  text: string;
}

export interface IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  isActive: boolean;
  role: IRole;
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
