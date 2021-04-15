import { methods } from 'api/core';
import { withNotification, withAuthorization } from '../utils';
import { VERSION_URL } from './constants';
import { User } from 'types';
import { TransferUser } from 'types/api/v1';

export const getUsers = () =>
  withNotification(withAuthorization(methods.get<User[]>(`${VERSION_URL}/users`)));

export const createUsers = (users: TransferUser[]) =>
  withNotification(
    withAuthorization(methods.put<null, TransferUser[]>(`${VERSION_URL}/users`, users))
  );
