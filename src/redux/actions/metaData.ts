import { SET_USER, SET_PERMISSIONS } from 'redux/actionTypes';
import { IUser, IPermission } from 'types';
import { ISetUserAction, ISetPermissionsAction } from 'types/redux/actions';

export const setUser = (payload: IUser | null): ISetUserAction => ({
  type: SET_USER,
  payload,
});

export const setPermissions = (payload: IPermission[]): ISetPermissionsAction => ({
  type: SET_PERMISSIONS,
  payload,
});
