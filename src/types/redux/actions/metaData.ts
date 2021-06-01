import { SET_USER, UPDATE_USER_ROLE, SET_PERMISSIONS, SET_STATUSES } from 'redux/actionTypes';
import { User, Role, Permission, Status } from 'types';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User | null;
}

export interface UpdateUserRoleAction {
  type: typeof UPDATE_USER_ROLE;
  payload: Role;
}

export interface SetPermissionsAction {
  type: typeof SET_PERMISSIONS;
  payload: Permission[];
}

export interface SetStatusesAction {
  type: typeof SET_STATUSES;
  payload: Status[];
}
