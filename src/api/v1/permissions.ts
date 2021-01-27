import { get } from './core';
import { IPermission } from 'types';

export const getPermissions = () => get<IPermission[]>('/permissions');
