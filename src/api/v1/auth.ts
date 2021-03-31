import { methods } from 'api/core';
import { withNotification } from '../utils';
import { AuthWithUsername, AuthWithEmail, AuthInfo } from 'types/api/v1';

export const authenticate = (credentials: AuthWithUsername | AuthWithEmail) =>
  withNotification(
    methods.post<AuthWithUsername | AuthWithEmail, AuthInfo>('/authentication', credentials)
  );
