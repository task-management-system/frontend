import { methods } from 'api/core';
import { withAuthorization, withNotification } from 'api/utils';
import { VERSION_URL } from './constants';
import { TaskInfo, DetailedReceivedTask, DetailedCreatedTask, UUID } from 'types';
import { CreateTask, FilesUpload } from 'types/api/v1';

const BASE_URL = `${VERSION_URL}/task`;

// export const prepareTask = (data: CreateTask) =>
//   withNotification(withAuthorization(methods.put<CreateTask, null>(`${BASE_URL}/create`, data)));

export const createTask = (data: CreateTask) =>
  withNotification(
    withAuthorization(methods.put<TaskInfo, CreateTask>(`${BASE_URL}/create`, data))
  );

export const getReceivedTask = (id: UUID) =>
  withNotification(
    withAuthorization(methods.get<DetailedReceivedTask>(`${BASE_URL}/received/${id}`))
  );

export const getCreatedTask = (id: UUID) =>
  withNotification(
    withAuthorization(methods.get<DetailedCreatedTask>(`${BASE_URL}/created/${id}`))
  );

export const downloadFileFromReceivedTask = (taskId: UUID, fileId: UUID) => {
  const params = new URLSearchParams({
    id: fileId,
  });

  return withNotification(
    withAuthorization(methods.get(`${BASE_URL}/received/${taskId}/file?${params}`))
  );
};

export const downloadFileFromCreatedTask = (taskId: UUID, fileId: UUID) => {
  const params = new URLSearchParams({
    id: fileId,
  });

  return withNotification(
    withAuthorization(methods.get(`${BASE_URL}/created/${taskId}/file?${params}`))
  );
};

export const attachFilesToCreated = (id: UUID, files: File[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file, file.name);
  }

  return withNotification(
    withAuthorization(
      methods.put<FilesUpload, FormData>(`${BASE_URL}/created/${id}/file`, formData)
    ),
    response => response.data?.e || null
  );
};
