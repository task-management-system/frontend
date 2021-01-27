export type TMessageType = 'success' | 'error' | 'warning';

export interface IMessage {
  type: TMessageType;
  text: string;
  stackTrace: string | null;
}

export interface IDetails {
  ok: boolean;
  status: number;
  statusText: string;
}

export type TDetails = {
  details: IDetails;
};

export type TResponse<T> = {
  message: IMessage | null;
  data: T | null;
};

export type TCollectedResponse<T> = TResponse<T> & TDetails;

export interface IPagination {
  page?: number;
  size?: number;
  order?: 'ASC' | 'DESC';
}
