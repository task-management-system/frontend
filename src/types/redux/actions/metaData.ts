import { SET_USER, SET_PERMISSIONS, SET_STATUSES } from 'redux/actionTypes';
import { User, Permission, Status } from 'types';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User | null;
}

export interface SetPermissionsAction {
  type: typeof SET_PERMISSIONS;
  payload: Permission[];
}

export interface SetStatusesAction {
  type: typeof SET_STATUSES;
  payload: Status[];
}
