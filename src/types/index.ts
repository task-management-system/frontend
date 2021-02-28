export interface IRole {
  id: number;
  power: number;
  text: string;
}

export interface IUser {
  id: number;
  username: string;
  name: string | null;
  email: string | null;
  isActive: boolean;
  role: IRole;
}

export interface IUserWithPassword extends IUser {
  password: string;
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

export interface IStatus {
  id: number;
  name: string;
}
