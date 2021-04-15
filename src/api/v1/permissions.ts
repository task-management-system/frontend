import { methods } from 'api/core';
import { VERSION_URL } from './constants';
import { Permission } from 'types';

export const getPermissions = () => methods.get<Permission[]>(`${VERSION_URL}/permissions`);
