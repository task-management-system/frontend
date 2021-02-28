import { methods } from '../core';
import { IPermission } from 'types';

export const getPermissions = () => methods.get<IPermission[]>('/permissions');
