import { methods } from 'api/core';
import { withNotification, withAuthorization } from '../utils';
import { User } from 'types';
import { TransferUser, ChangePassword } from 'types/api/v1';

const API_BASE = '/user';

export const lock = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(
    withAuthorization(methods.patch<null, null>(`${API_BASE}/lock?${params}`, null))
  );
};

export const unlock = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(
    withAuthorization(methods.patch<null, null>(`${API_BASE}/unlock?${params}`, null))
  );
};

export const getUser = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(withAuthorization(methods.get<User>(`${API_BASE}?${params}`)));
};

export const updateUser = (id: number, data: TransferUser) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(
    withAuthorization(methods.patch<TransferUser, null>(`${API_BASE}?${params}`, data))
  );
};

export const changePassword = (id: number, data: ChangePassword) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(
    withAuthorization(
      methods.patch<ChangePassword, null>(`${API_BASE}/change-password?${params}`, data)
    )
  );
};

export const getCurrentUser = () => withAuthorization(methods.get<User>(`${API_BASE}/current`));
