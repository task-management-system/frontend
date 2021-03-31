import { User, UUID } from 'types';

export interface Auth {
  user: User | null;
  token: string;
}

export interface TransferUser {
  username: string;
  name: string | null;
  email: string | null;
  roleId: number;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface CreateTask {
  title: string;
  description: string | null;
  text: string;
  dueDate: number | string;
  executorIds: UUID[];
}
