import { methods } from './core';
import { withNotification, withAuthorization } from '../utils';
import { IUser } from 'types';
import { IUpdateUser } from 'types/api/v1';

const API_BASE = '/user';

export const lock = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(
    withAuthorization(methods.patch<null, {}>(`${API_BASE}/lock?${params}`, null))
  );
};

export const unlock = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(
    withAuthorization(methods.patch<null, {}>(`${API_BASE}/unlock?${params}`, null))
  );
};

export const getUser = (id: number) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(withAuthorization(methods.get<IUser>(`${API_BASE}?${params}`)));
};

export const updateUser = (id: number, data: IUpdateUser) => {
  const params = new URLSearchParams({
    id: id.toString(),
  });

  return withNotification(
    withAuthorization(methods.patch<IUpdateUser, {}>(`${API_BASE}?${params}`, data))
  );
};
