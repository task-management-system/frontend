import { methods } from 'api/core';
import { withAuthorization, withNotification } from 'api/utils';
import { DetailedTaskInfo, UUID } from 'types';
import { CreateTask } from 'types/api/v1';

const API_BASE = '/task';

export const createTask = (data: CreateTask) =>
  withNotification(withAuthorization(methods.put<CreateTask, null>(API_BASE, data)));

export const getReceivedTask = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return withNotification(
    withAuthorization(methods.get<DetailedTaskInfo>(`${API_BASE}/received?${params}`))
  );
};

export const getCreatedTask = (id: UUID) => {
  const params = new URLSearchParams({
    id,
  });

  return withNotification(withAuthorization(methods.get<{}>(`${API_BASE}/created?${params}`)));
};
