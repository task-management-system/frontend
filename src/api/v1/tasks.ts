import { methods, collectPaginationParams } from 'api/core';
import { withAuthorization, withNotification } from 'api/utils';
import { VERSION_URL } from './constants';
import { TaskInstance, TaskInfo } from 'types';
import { Pagination, Paged } from 'types/api';

const BASE_URL = `${VERSION_URL}/tasks`;

export const getReceivedTasks = (statusId: number, pagination: Pagination) => {
  const params = collectPaginationParams(pagination);
  params.append('statusId', statusId.toString());

  return withNotification(
    withAuthorization(methods.get<Paged<TaskInstance[]>>(`${BASE_URL}/received?${params}`))
  );
};

export const getCreatedTasks = (statusId: number, pagination: Pagination) => {
  const params = collectPaginationParams(pagination);
  params.append('statusId', statusId.toString());

  return withNotification(
    withAuthorization(methods.get<Paged<TaskInfo[]>>(`${BASE_URL}/created?${params}`))
  );
};
