import { methods } from 'api/core';
import { extractRequest, withAuthorization } from 'api/utils';
import { VERSION_URL } from './constants';
import { Status } from 'types';

export const getStatuses = () =>
  extractRequest(withAuthorization(methods.get<Status[]>(`${VERSION_URL}/statuses`)));
