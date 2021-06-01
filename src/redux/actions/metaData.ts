import { SET_USER, SET_PERMISSIONS, SET_STATUSES, UPDATE_USER_ROLE } from 'redux/actionTypes';
import { User, Role, Permission, Status } from 'types';
import {
  SetUserAction,
  UpdateUserRoleAction,
  SetPermissionsAction,
  SetStatusesAction,
} from 'types/redux/actions';

export const setUser = (payload: User | null): SetUserAction => ({
  type: SET_USER,
  payload,
});

export const updateUserRole = (payload: Role): UpdateUserRoleAction => ({
  type: UPDATE_USER_ROLE,
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
