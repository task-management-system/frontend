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

export interface Rejection {
  name: string;
  cause: string;
}

export type NotificationType = 'success' | 'error' | 'warning';

export type NotificationDetails = Rejection[];

export interface Notification {
  id: string;
  type: NotificationType;
  text: string;
  details: NotificationDetails | null;
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

export interface Parent {
  id: UUID;
  status: Status;
}

export interface TaskInfo {
  id: UUID;
  title: string;
  description: string | null;
  creator: Creator;
  dueDate: string;
}

export interface DetailedTaskInfo extends TaskInfo {
  markdown: string | null;
  files: FileDescriptor[];
  parent?: Parent;
  createdAt: string;
}

export type TaskInstance = {
  id: UUID;
  task: TaskInfo;
};

export interface FileDescriptor {
  id: UUID;
  name: string;
  size: number;
  data?: File;
}
