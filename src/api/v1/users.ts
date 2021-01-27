// import { get, collectPaginationParams } from './core';
import { post } from './core';
import { withNotification, withAuthorization } from '../utils';
import { IUser } from 'types';
import { IPagination } from 'types/api';

// export const getUsers = (pagination: IPagination = {}) => {
//   const paginationParams = collectPaginationParams(pagination);

//   return withNotification(withAuthorization(get<IUser[]>(`/users?${paginationParams}`)));
// };

export const getUsers = (pagination: IPagination = {}) => {
  return withNotification(
    withAuthorization(
      post<IPagination, IUser[]>('/users', {
        page: pagination.page || 1,
        size: pagination.size || 25,
        order: pagination.order || 'ASC',
      })
    )
  );
};
