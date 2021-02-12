import { IUser } from 'types';

export interface IAuth {
  user: IUser | null;
  token: string;
}

export interface ITransferUser {
  username: string;
  password: string;
  name: string | null;
  email: string | null;
  isActive: boolean;
  roleId: number;
}
