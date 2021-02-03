// import { get, collectPaginationParams } from './core';
import { methods } from './core';
import { withNotification, withAuthorization } from '../utils';
import { IUser } from 'types';
import { IPagination, TPaged } from 'types/api';

// export const getUsers = (pagination: IPagination = {}) => {
//   const paginationParams = collectPaginationParams(pagination);

//   return withNotification(withAuthorization(get<IUser[]>(`/users?${paginationParams}`)));
// };

export const getUsers = (pagination: IPagination = {}) => {
  return withNotification(
    withAuthorization(
      methods.post<IPagination, TPaged<IUser[]>>('/users', {
        page: pagination.page || 1,
        size: pagination.size || 25,
        order: pagination.order || 'ASC',
      })
    )
  );
};
