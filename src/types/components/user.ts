import { IRole } from 'types';
import { Undefinable } from 'types/common';

export interface IUserForm {
  username: string;
  name: string;
  email: string;
  role: IRole;
}

export type TUndefinableUserForm = Undefinable<IUserForm>;
