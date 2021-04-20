export type RequestWithCancel<T> = [Promise<CollectedResponse<T>>, () => void];

export type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Message {
  type: 'success' | 'error' | 'warning';
  text: string;
  stackTrace: string | null;
}

export interface Details {
  ok: boolean;
  status: number;
  statusText: string;
}

export type BasicResponse<T> = {
  message: Message | null;
  data: T | null;
};

export type Paged<T> = {
  total: number;
  list: T;
};

export type CollectedResponse<T> = BasicResponse<T> & {
  details: Details;
};

export interface Pagination {
  page?: number;
  size?: number;
  order?: 'ASC' | 'DESC';
}
