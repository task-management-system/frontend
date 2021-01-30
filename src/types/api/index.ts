export interface IMessage {
  type: 'success' | 'error' | 'warning';
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

export type TPaged<T> = {
  total: number;
  list: T;
};

export type TCollectedResponse<T> = TResponse<T> & TDetails;

export interface IPagination {
  page?: number;
  size?: number;
  order?: 'ASC' | 'DESC';
}
