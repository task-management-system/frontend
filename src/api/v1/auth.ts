import { post } from './core';
import { withNotification } from '../utils';
import { IAuth } from 'types/api/v1';
import { IAuthForm } from 'types/components/auth';

export const authenticate = (credentials: IAuthForm) =>
  withNotification(post<IAuthForm, IAuth>('/authentication', credentials));
