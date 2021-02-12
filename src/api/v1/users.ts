import { methods, collectPaginationParams } from './core';
import { withNotification, withAuthorization } from '../utils';
import { IUser } from 'types';
import { IPagination, TPaged } from 'types/api';
import { ITransferUser } from 'types/api/v1';

export const getUsers = (pagination: IPagination = {}) => {
  const paginationParams = collectPaginationParams(pagination);

  return withNotification(
    withAuthorization(methods.get<TPaged<IUser[]>>(`/users?${paginationParams}`))
  );
};

export const createUsers = (users: ITransferUser[]) => {
  return withNotification(withAuthorization(methods.put<ITransferUser[], null>('/users', users)));
};
