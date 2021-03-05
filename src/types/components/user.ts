import { Role } from 'types';
import { Undefinable } from 'types/common';

export interface UserForm {
  username: string;
  name: string;
  email: string;
  role: Role;
}

export type UndefinableUserForm = Undefinable<UserForm>;
