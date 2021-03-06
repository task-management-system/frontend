import { methods } from 'api/core';
import { withNotification } from '../utils';
import { Auth } from 'types/api/v1';
import { AuthForm } from 'types/components/auth';

export const authenticate = (credentials: AuthForm) =>
  withNotification(methods.post<AuthForm, Auth>('/authentication', credentials));
