import { SET_USER, SET_PERMISSIONS, SET_STATUSES } from 'redux/actionTypes';
import { IUser, IPermission, IStatus } from 'types';

export interface ISetUserAction {
  type: typeof SET_USER;
  payload: IUser | null;
}

export interface ISetPermissionsAction {
  type: typeof SET_PERMISSIONS;
  payload: IPermission[];
}

export interface ISetStatusesAction {
  type: typeof SET_STATUSES;
  payload: IStatus[];
}
