import { IUser } from 'types';

type MessageType = 'success' | 'error' | 'warning';

interface Message {
  type: MessageType;
  text: string;
}

export type Response<T> = {
  message: Message | null;
  data: T | null;
};

export interface Payload {
  [key: string]: Payload | string | number | boolean | null;
}

export interface Auth {
  user: IUser | null;
  token: string;
}
