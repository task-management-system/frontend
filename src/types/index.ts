export interface Role {
  id: number;
  power: number;
  text: string;
}

export interface User {
  id: number;
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
  id: number;
  username: string;
  name: string | null;
  email: string | null;
}

export interface Task {
  taskId: number;
  detailId: number;
  title: string;
  description: string | null;
  creator: Creator;
  dueDate: number;
}
