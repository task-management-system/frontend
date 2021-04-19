import { User, FileDescriptor, UUID } from 'types';

export interface AuthInfo {
  user: User | null;
  token: string;
}

export interface AuthWithUsername {
  username: string;
  password: string;
}

export interface AuthWithEmail {
  email: string;
  password: string;
}

export interface WithId {
  id: UUID;
}

export interface TransferUser {
  username: string;
  name: string | null;
  email: string | null;
  roleId: number;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface CreateTask {
  title: string;
  description: string | null;
  markdown: string | null;
  dueDate: string;
  executorIds: UUID[];
}

export interface FailedFileUpload {
  name: string;
  size?: number;
  cause: string;
}

export type SuccessFileUpload = Omit<FileDescriptor, 'data'>;

export interface FilesUpload {
  success: SuccessFileUpload[];
  error: FailedFileUpload[];
}
