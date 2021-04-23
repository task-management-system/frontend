import { TaskStatus } from 'enums/TaskStatus';

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
  id: TaskStatus;
  name: string;
}

export interface Parent {
  id: UUID;
  status: Status;
  files: FileDescriptor[];
}

export interface Task {
  id: UUID;
  title: string;
  description: string | null;
  dueDate: string;
}

export interface TaskInfo extends Task {
  creator: User;
}

export interface DetailedTask extends Task {
  markdown: string | null;
  files: FileDescriptor[];
  status: Status;
  createdAt: string;
}

export interface DetailedReceivedTask extends DetailedTask {
  parent: Parent;
}

export interface DetailedCreatedTask extends DetailedTask {
  taskInstances: DetailedTaskInstance[];
}

export type TaskInstance = {
  id: UUID;
  task: TaskInfo;
};

export type DetailedTaskInstance = {
  id: UUID;
  status: Status;
  files: FileDescriptor[];
  executor: User;
};

export interface FileDescriptor {
  id: UUID;
  name: string;
  size: number;
  data?: File;
}
