import { getToken } from './utils';
import { CollectedResponse, BasicResponse, Pagination } from 'types/api';

const API_URL = '/api/v1';

export const prepareHeaders = async <T>(headers: Headers, payload?: T): Promise<void> => {
  const token = await getToken();

  if (token !== null) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type')) {
    if (!(payload instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
    }
  }
};

export const prepareBody = <T>(payload: T) => {
  if (payload instanceof FormData) {
    return payload;
  } else {
    return JSON.stringify(payload);
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

export const collectPaginationParams = (pagination: Pagination) =>
  new URLSearchParams({
    page: (pagination.page || 1).toString(),
    size: (pagination.size || 25).toString(),
    order: pagination.order || 'ASC',
  });

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
  await prepareHeaders(headers, payload);
  const body = prepareBody(payload);

  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers,
    body,
  }).then(response => collectResponse(response));
};

const putMethod = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers, payload);
  const body = prepareBody(payload);

  return fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers,
    body,
  }).then(response => collectResponse(response));
};

const patchMethod = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers, payload);
  const body = prepareBody(payload);

  return fetch(`${API_URL}${url}`, {
    method: 'PATCH',
    headers,
    body,
  }).then(response => collectResponse(response));
};

const deleteMethod = async <P, T>(
  url: string = '/',
  payload: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(headers, payload);
  const body = prepareBody(payload);

  return fetch(`${API_URL}${url}`, {
    method: 'DELETE',
    headers,
    body,
  }).then(response => collectResponse(response));
};

export const methods = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  patch: patchMethod,
  delete: deleteMethod,
};
