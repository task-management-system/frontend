import { methods } from './core';
import { withNotification, withAuthorization } from '../utils';

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
