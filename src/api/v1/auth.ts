import { post } from './core';
import { withNotification } from '../utils';
import { Auth } from '../types';

export const authentication = (credentials: { username: string; password: string }) =>
  withNotification(post<Auth>('/authentication', credentials));
