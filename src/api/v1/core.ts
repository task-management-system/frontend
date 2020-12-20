import { getToken } from '../utils';
import { Response, Payload } from '../types';

const API_URL = '/api/v1';

const prepareHeaders = async (headers: Headers): Promise<void> => {
  const token = await getToken();

  if (token !== null) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type')) {
    headers.append('Content-Type', 'application/json');
  }
};

// const fixResponse = <T>(response: Response<T>): Promise<Response<T>> =>
//   new Promise(resolve => {
//     if (response.data === null) {
//       response.data = {} as T;
//     }

//     resolve(response);
//   });

export const get = async <T>(
  url: string = '/',
  headers: Headers = new Headers()
): Promise<Response<T> | string> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers,
  }).then(response => response.json());
};

export const post = async <T>(
  url: string = '/',
  payload: Payload = {},
  headers: Headers = new Headers()
): Promise<Response<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).then(response => response.json());
};

export const put = async <T>(
  url: string = '/',
  payload: Payload = {},
  headers: Headers = new Headers()
): Promise<Response<T>> => {
  await prepareHeaders(headers);

  return fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  }).then(response => response.json());
};
