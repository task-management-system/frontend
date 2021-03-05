import { getToken } from './utils';
import { CollectedResponse, BasicResponse, Pagination } from 'types/api';

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

export const collectResponse = async <T>(response: Response): Promise<CollectedResponse<T>> => {
  const data = (await response.json()) as BasicResponse<T>;
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

export const collectPaginationParams = (pagination: Pagination): URLSearchParams => {
  const params = new URLSearchParams();
  params.set('page', (pagination.page || 1).toString());
  params.set('size', (pagination.size || 25).toString());
  params.set('order', pagination.order || 'ASC');

  return params;
};

const getMethod = async <T>(
  url: string = '/',
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers,
  }).then(response => collectResponse(response));
};

const postMethod = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).then(response => collectResponse(response));
};

const putMethod = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  }).then(response => collectResponse(response));
};

const patchMethod = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload),
  }).then(response => collectResponse(response));
};

const deleteMethod = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(payload),
  }).then(response => collectResponse(response));
};

export const methods = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  patch: patchMethod,
  delete: deleteMethod,
};
