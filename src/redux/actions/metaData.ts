import { SET_USER, SET_PERMISSIONS, SET_STATUSES } from 'redux/actionTypes';
import { IUser, IPermission, IStatus } from 'types';
import { ISetUserAction, ISetPermissionsAction, ISetStatusesAction } from 'types/redux/actions';

export const setUser = (payload: IUser | null): ISetUserAction => ({
  type: SET_USER,
  payload,
});

export const setPermissions = (payload: IPermission[]): ISetPermissionsAction => ({
  type: SET_PERMISSIONS,
  payload,
});

export const setStatuses = (payload: IStatus[]): ISetStatusesAction => ({
  type: SET_STATUSES,
  payload,
});
