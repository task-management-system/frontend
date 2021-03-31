import { methods } from 'api/core';
import { withNotification, withAuthorization } from '../utils';
import { User } from 'types';
import { TransferUser } from 'types/api/v1';

export const getUsers = () => withNotification(withAuthorization(methods.get<User[]>('/users')));

export const createUsers = (users: TransferUser[]) => {
  return withNotification(withAuthorization(methods.put<TransferUser[], null>('/users', users)));
};
