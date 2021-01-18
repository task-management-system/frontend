import { IUser } from 'types';

export interface Auth {
  user: IUser | null;
  token: string;
}
