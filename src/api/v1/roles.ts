import { methods } from './core';
import { withAuthorization, withCache } from '../utils';
import { IRole } from 'types';

export const getRoles = withCache('roles', 30 * 60 * 1000, () =>
  withAuthorization(methods.get<IRole[]>('/roles'))
);
