import { methods } from 'api/core';
import { withNotification } from '../utils';
import { VERSION_URL } from './constants';
import { AuthWithUsername, AuthWithEmail, AuthInfo } from 'types/api/v1';

export const authenticate = (credentials: AuthWithUsername | AuthWithEmail) =>
  withNotification(
    methods.post<AuthInfo, AuthWithUsername | AuthWithEmail>(
      `${VERSION_URL}/authentication`,
      credentials
    )
  );
