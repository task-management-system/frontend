import { User } from 'types';

export interface Auth {
  user: User | null;
  token: string;
}

export interface TransferUser {
  username: string;
  name: string | null;
  email: string | null;
  roleId: number;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}
