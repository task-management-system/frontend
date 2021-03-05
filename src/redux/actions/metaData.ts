import { SET_USER, SET_PERMISSIONS, SET_STATUSES } from 'redux/actionTypes';
import { User, Permission, Status } from 'types';
import { SetUserAction, SetPermissionsAction, SetStatusesAction } from 'types/redux/actions';

export const setUser = (payload: User | null): SetUserAction => ({
  type: SET_USER,
  payload,
});

export const setPermissions = (payload: Permission[]): SetPermissionsAction => ({
  type: SET_PERMISSIONS,
  payload,
});

export const setStatuses = (payload: Status[]): SetStatusesAction => ({
  type: SET_STATUSES,
  payload,
});
