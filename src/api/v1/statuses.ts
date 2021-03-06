import { methods } from 'api/core';
import { withAuthorization } from 'api/utils';
import { Status } from 'types';

export const getStatuses = () => withAuthorization(methods.get<Status[]>('/statuses'));
