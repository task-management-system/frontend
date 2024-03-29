import { methods } from 'api/core';
import { extractRequest, withNotification, withAuthorization } from '../utils';
import { VERSION_URL } from './constants';
import { User, UUID } from 'types';
import { WithId, TransferUser, ChangePassword } from 'types/api/v1';

const BASE_URL = `${VERSION_URL}/user`;

export const lock = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return extractRequest(
    withNotification(withAuthorization(methods.patch<User, null>(`${BASE_URL}/lock?${params}`)))
  );
};

export const unlock = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return extractRequest(
    withNotification(withAuthorization(methods.patch<User, null>(`${BASE_URL}/unlock?${params}`)))
  );
};

export const getUser = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return extractRequest(
    withNotification(withAuthorization(methods.get<User>(`${BASE_URL}?${params}`)))
  );
};

export const updateUser = (data: WithId & TransferUser) =>
  extractRequest(
    withNotification(withAuthorization(methods.patch<User, TransferUser>(BASE_URL, data)))
  );

export const changePassword = (data: WithId & ChangePassword) =>
  extractRequest(
    withNotification(
      withAuthorization(methods.patch<null, ChangePassword>(`${BASE_URL}/change-password`, data))
    )
  );

export const getCurrentUser = () =>
  extractRequest(withNotification(withAuthorization(methods.get<User>(`${BASE_URL}/current`))));
