import { User } from 'types';
import { SET_USERS, UPDATE_USER } from 'redux/actionTypes';

export interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: User;
}
