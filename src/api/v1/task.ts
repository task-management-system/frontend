import { methods } from 'api/core';
import { withAuthorization, withNotification } from 'api/utils';
import { CreateTask } from 'types/api/v1';

export const createTask = (data: CreateTask) =>
  withNotification(withAuthorization(methods.put<CreateTask, null>('/task', data)));
