import { methods } from 'api/core';
import { withNotification, withAuthorization } from '../utils';
import { User, UUID } from 'types';
import { TransferUser, ChangePassword } from 'types/api/v1';

const API_BASE = '/user';

export const lock = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return withNotification(
    withAuthorization(methods.patch<null, null>(`${API_BASE}/lock?${params}`, null))
  );
};

export const unlock = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return withNotification(
    withAuthorization(methods.patch<null, null>(`${API_BASE}/unlock?${params}`, null))
  );
};

export const getUser = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return withNotification(withAuthorization(methods.get<User>(`${API_BASE}?${params}`)));
};

export const updateUser = (id: UUID, data: TransferUser) => {
  const params = new URLSearchParams({
    id,
  });

  return withNotification(
    withAuthorization(methods.patch<TransferUser, null>(`${API_BASE}?${params}`, data))
  );
};

export const changePassword = (data: ChangePassword) =>
  withNotification(
    withAuthorization(methods.patch<ChangePassword, null>(`${API_BASE}/change-password`, data))
  );

export const getCurrentUser = () => withAuthorization(methods.get<User>(`${API_BASE}/current`));
