import { methods, collectPaginationParams } from 'api/core';
import { withAuthorization, withNotification } from 'api/utils';
import { Task } from 'types';
import { Pagination, Paged } from 'types/api';

const API_BASE = '/tasks';

export const getReceivedTasks = (statusId: number, pagination: Pagination) => {
  const params = collectPaginationParams(pagination);
  params.append('statusId', statusId.toString());

  return withNotification(
    withAuthorization(methods.get<Paged<Task[]>>(`${API_BASE}/received?${params}`))
  );
};

// export const getCreatedTasks = (statusId: number, pagination: Pagination) => {
//   const params = collectPaginationParams(pagination);
//   params.append('statusId', statusId.toString());

//   return withAuthorization(methods.get<Paged<Task[]>>(`${API_BASE}/received?${params}`));
// };

export const getCreatedTasks = (pagination: Pagination) => {
  const params = collectPaginationParams(pagination);

  return withNotification(
    withAuthorization(methods.get<Paged<Task[]>>(`${API_BASE}/created?${params}`))
  );
};
