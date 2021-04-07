import { User } from 'types';
import { SetUsersAction, UpdateUserAction } from '../actions/users';

export type Users = User[];

export type UsersAction = SetUsersAction | UpdateUserAction;
