import { methods } from '../core';
import { withAuthorization, withCache } from '../utils';
import { Role } from 'types';

export const getRoles = withCache('roles', 30 * 60 * 1000, () =>
  withAuthorization(methods.get<Role[]>('/roles'))
);
