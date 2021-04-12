import { methods } from 'api/core';
import { withNotification, withAuthorization, withCache } from '../utils';
import { Role } from 'types';

export const getRoles = () => withNotification(withAuthorization(methods.get<Role[]>('/roles')));

export const loadRoles = withCache('roles', 30 * 60 * 1000, getRoles);

export const updateRole = (data: Role) =>
  withNotification(withAuthorization(methods.patch<Role, Role>('/role', data)));

export const deleteRole = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(withAuthorization(methods.delete(`/role?${params}`, null)));
};
