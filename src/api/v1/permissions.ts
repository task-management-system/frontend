import { methods } from 'api/core';
import { Permission } from 'types';

export const getPermissions = () => methods.get<Permission[]>('/permissions');
