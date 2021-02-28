import { methods } from '../core';
import { withAuthorization } from 'api/utils';
import { IStatus } from 'types';

export const getStatuses = () => withAuthorization(methods.get<IStatus[]>('/statuses'));
