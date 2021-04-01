export type UUID = string;

export interface Role {
  id: number;
  power: number;
  meaning: string;
}

export interface User {
  id: UUID;
  username: string;
  name: string | null;
  email: string | null;
  isActive: boolean;
  role: Role;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface Permission {
  name: string;
  power: number;
  description: string;
}

export type NotificationType = 'success' | 'error' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  text: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Creator {
  id: UUID;
  username: string;
  name: string | null;
}

export interface Executor {
  id: UUID;
  username: string;
  name: string | null;
}

export interface TaskShortInfo {
  id: UUID;
  title: string;
  description: string | null;
  creator: Creator;
  dueDate: string;
}

export interface TaskFullInfo extends TaskShortInfo {
  markdown: string | null;
  createdAt: string;
}

export type TaskInstance = {
  id: UUID;
  task: TaskShortInfo;
};
