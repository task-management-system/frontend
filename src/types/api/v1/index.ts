import { User, UUID } from 'types';

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

export interface TransferUser {
  username: string;
  name: string | null;
  email: string | null;
  roleId: number;
}

export interface ChangePassword {
  id: UUID;
  oldPassword: string;
  newPassword: string;
}

export interface CreateTask {
  title: string;
  description: string | null;
  text: string;
  dueDate: number | string;
  executorIds: UUID[];
}
