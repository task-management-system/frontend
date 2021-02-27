import { methods } from './core';
import { withNotification, withAuthorization } from '../utils';
import { IUser } from 'types';
import { TPaged } from 'types/api';
import { ITransferUser } from 'types/api/v1';

export const getUsers = () =>
  withNotification(withAuthorization(methods.get<TPaged<IUser[]>>('/users')));

export const createUsers = (users: ITransferUser[]) => {
  return withNotification(withAuthorization(methods.put<ITransferUser[], null>('/users', users)));
};
