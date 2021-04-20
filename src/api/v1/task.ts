import { methods } from 'api/core';
import { extractRequest, withAuthorization, withNotification } from 'api/utils';
import { VERSION_URL } from './constants';
import { TaskInfo, DetailedReceivedTask, DetailedCreatedTask, UUID } from 'types';
import { CreateTask, FilesUpload } from 'types/api/v1';

const BASE_URL = `${VERSION_URL}/task`;

// export const prepareTask = (data: CreateTask) =>
//   withNotification(withAuthorization(methods.put<CreateTask, null>(`${BASE_URL}/create`, data)));

export const createTask = (data: CreateTask) =>
  extractRequest(
    withNotification(
      withAuthorization(methods.put<TaskInfo, CreateTask>(`${BASE_URL}/create`, data))
    )
  );

export const getReceivedTask = (id: UUID) =>
  withNotification(
    withAuthorization(methods.get<DetailedReceivedTask>(`${BASE_URL}/received/${id}`))
  );

export const getCreatedTask = (id: UUID) =>
  withNotification(
    withAuthorization(methods.get<DetailedCreatedTask>(`${BASE_URL}/created/${id}`))
  );

const attachFiles = (path: string, id: UUID, files: File[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file, file.name);
  }

  return extractRequest(
    withNotification(
      withAuthorization(
        methods.put<FilesUpload, FormData>(`${BASE_URL}/${path}/${id}/file`, formData)
      ),
      response => response.data?.error || null
    )
  );
};

export const attachFilesToReceived = (id: UUID, files: File[]) =>
  attachFiles('received', id, files);

export const attachFilesToCreated = (id: UUID, files: File[]) => attachFiles('created', id, files);

export const getFile = (id: UUID) =>
  extractRequest(withNotification(withAuthorization(methods.get<Blob>(`${BASE_URL}/file/${id}`))));

export const deleteFile = (id: UUID) =>
  extractRequest(withNotification(withAuthorization(methods.delete(`${BASE_URL}/file/${id}`))));
