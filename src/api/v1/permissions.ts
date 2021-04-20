import { methods } from 'api/core';
import { extractRequest } from 'api/utils';
import { VERSION_URL } from './constants';
import { Permission } from 'types';

export const getPermissions = () =>
  extractRequest(methods.get<Permission[]>(`${VERSION_URL}/permissions`));
