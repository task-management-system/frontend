import { methods } from 'api/core';
import { withNotification, withAuthorization } from '../utils';
import { User } from 'types';
import { Paged } from 'types/api';
import { TransferUser } from 'types/api/v1';

export const getUsers = () =>
  withNotification(withAuthorization(methods.get<Paged<User[]>>('/users')));

export const createUsers = (users: TransferUser[]) => {
  return withNotification(withAuthorization(methods.put<TransferUser[], null>('/users', users)));
};
