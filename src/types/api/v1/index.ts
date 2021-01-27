import { IUser } from 'types';

export interface IAuth {
  user: IUser | null;
  token: string;
}
