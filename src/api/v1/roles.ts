import { methods } from 'api/core';
import { extractRequest, withNotification, withAuthorization, withCache } from 'api/utils';
import { VERSION_URL } from './constants';
import { Role } from 'types';
import { CreateRole } from 'types/api/v1';

export const getRoles = () =>
  extractRequest(withNotification(withAuthorization(methods.get<Role[]>(`${VERSION_URL}/roles`))));

export const loadRoles = withCache('roles', 30 * 60 * 1000, getRoles);

export const createRole = (data: CreateRole) =>
  extractRequest(
    withNotification(withAuthorization(methods.put<Role, CreateRole>(`${VERSION_URL}/role`, data)))
  );

export const updateRole = (data: Role) =>
  extractRequest(
    withNotification(withAuthorization(methods.patch<Role, Role>(`${VERSION_URL}/role`, data)))
  );

export const deleteRole = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return extractRequest(
    withNotification(withAuthorization(methods.delete(`${VERSION_URL}/role?${params}`)))
  );
};
