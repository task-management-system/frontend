import { getToken } from '../utils';
import { TCollectedResponse, TResponse, IPagination } from 'types/api';

const API_URL = '/api/v1';

export const prepareHeaders = async (headers: Headers): Promise<void> => {
  const token = await getToken();

  if (token !== null) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type')) {
    headers.append('Content-Type', 'application/json');
  }
};

export const collectResponse = async <T>(response: Response): Promise<TCollectedResponse<T>> => {
  const data = (await response.json()) as TResponse<T>;
  const { ok, status, statusText } = response;

  return {
    ...data,
    details: {
      ok,
      status,
      statusText,
    },
  };
};

export const collectPaginationParams = (pagination: IPagination): URLSearchParams => {
  const params = new URLSearchParams();
  params.set('page', (pagination.page || 1).toString());
  params.set('size', (pagination.size || 25).toString());
  params.set('order', pagination.order || 'ASC');

  return params;
};

export const get = async <T>(
  url: string = '/',
  headers: Headers = new Headers()
): Promise<TCollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers,
  }).then(response => collectResponse(response));
};

export const post = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<TCollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).then(response => collectResponse(response));
};

export const put = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<TCollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  }).then(response => collectResponse(response));
};
