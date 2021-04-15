import { methods } from 'api/core';
import { withNotification, withAuthorization, withCache } from '../utils';
import { VERSION_URL } from './constants';
import { Role } from 'types';

export const getRoles = () =>
  withNotification(withAuthorization(methods.get<Role[]>(`${VERSION_URL}/roles`)));

export const loadRoles = withCache('roles', 30 * 60 * 1000, getRoles);

export const updateRole = (data: Role) =>
  withNotification(withAuthorization(methods.patch<Role, Role>(`${VERSION_URL}/role`, data)));

export const deleteRole = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(withAuthorization(methods.delete(`${VERSION_URL}/role?${params}`)));
};
