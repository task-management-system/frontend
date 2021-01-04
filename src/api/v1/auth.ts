import { get, post } from './core';
import { withNotification } from '../utils';
import { Auth } from '../types';

export const authentication = (credentials: { username: string; password: string }) =>
  post<Auth>('/authentication', credentials);

export const getUsers = () => withNotification(get<{}>('/users'));
