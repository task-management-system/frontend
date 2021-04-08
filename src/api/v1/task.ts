import { methods } from 'api/core';
import { withAuthorization, withNotification } from 'api/utils';
import { TaskInfo, DetailedTaskInfo, UUID } from 'types';
import { CreateTask, FilesUpload } from 'types/api/v1';

const API_BASE = '/task';

// export const prepareTask = (data: CreateTask) =>
//   withNotification(withAuthorization(methods.put<CreateTask, null>(`${API_BASE}/create`, data)));

export const createTask = (data: CreateTask) =>
  withNotification(
    withAuthorization(methods.put<CreateTask, TaskInfo>(`${API_BASE}/create`, data))
  );

export const getReceivedTask = (id: UUID) =>
  withNotification(withAuthorization(methods.get<DetailedTaskInfo>(`${API_BASE}/received/${id}`)));

export const getCreatedTask = (id: UUID) =>
  withNotification(withAuthorization(methods.get<DetailedTaskInfo>(`${API_BASE}/created/${id}`)));

export const attachFilesToCreated = (id: UUID, files: File[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file, file.name);
  }

  return withNotification(
    withAuthorization(
      methods.put<FormData, FilesUpload>(`${API_BASE}/created/${id}/file`, formData)
    ),
    response => response.data?.e || null
  );
};
