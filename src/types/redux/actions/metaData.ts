import { SET_USER, SET_PERMISSIONS } from 'redux/actionTypes';
import { IUser, IPermission } from 'types';

export interface ISetUserAction {
  type: typeof SET_USER;
  payload: IUser | null;
}

export interface ISetPermissionsAction {
  type: typeof SET_PERMISSIONS;
  payload: IPermission[];
}
