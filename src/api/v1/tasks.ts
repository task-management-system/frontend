import { methods, collectPaginationParams } from 'api/core';
import { withAuthorization, withNotification } from 'api/utils';
import { TaskInstance, TaskInfo } from 'types';
import { Pagination, Paged } from 'types/api';

const API_BASE = '/tasks';

export const getReceivedTasks = (statusId: number, pagination: Pagination) => {
  const params = collectPaginationParams(pagination);
  params.append('statusId', statusId.toString());

  return withNotification(
    withAuthorization(methods.get<Paged<TaskInstance[]>>(`${API_BASE}/received?${params}`))
  );
};

export const getCreatedTasks = (statusId: number, pagination: Pagination) => {
  const params = collectPaginationParams(pagination);
  params.append('statusId', statusId.toString());

  return withAuthorization(methods.get<Paged<TaskInfo[]>>(`${API_BASE}/created?${params}`));
};
