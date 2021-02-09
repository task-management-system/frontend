import { methods } from './core';
import { withAuthorization } from '../utils';
import { IRole } from 'types';

export const getRoles = () => {
  return withAuthorization(methods.get<IRole[]>('/roles'));
};
