import { SET_USERS, UPDATE_USER } from 'redux/actionTypes';
import { User } from 'types';
import { SetUsersAction, UpdateUserAction } from 'types/redux/actions';

export const setUsers = (payload: User[]): SetUsersAction => ({
  type: SET_USERS,
  payload,
});

export const updateUser = (payload: User): UpdateUserAction => ({
  type: UPDATE_USER,
  payload,
});
