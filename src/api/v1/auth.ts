import { methods } from 'api/core';
import { extractRequest, withNotification } from 'api/utils';
import { VERSION_URL } from './constants';
import { AuthWithUsername, AuthWithEmail, AuthInfo } from 'types/api/v1';

export const authenticate = (credentials: AuthWithUsername | AuthWithEmail) =>
  extractRequest(
    withNotification(
      methods.post<AuthInfo, AuthWithUsername | AuthWithEmail>(
        `${VERSION_URL}/authentication`,
        credentials
      )
    )
  );
