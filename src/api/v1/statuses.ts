import { methods } from 'api/core';
import { withAuthorization } from 'api/utils';
import { VERSION_URL } from './constants';
import { Status } from 'types';

export const getStatuses = () =>
  withAuthorization(methods.get<Status[]>(`${VERSION_URL}/statuses`));
