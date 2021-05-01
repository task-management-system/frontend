import { getToken } from './utils';
import { Methods, CollectedResponse, BasicResponse, Pagination } from 'types/api';

const API_URL = '/api';

const prepareHeaders = async <T>(method: Methods, headers: Headers, payload?: T): Promise<void> => {
  const token = await getToken();

  if (token !== null) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (method !== 'GET' && !headers.has('Content-Type')) {
    if (!(payload instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
    }
  }
};

const prepareBody = <T>(payload: T) => {
  if (payload instanceof FormData) {
    return payload;
  } else {
    return JSON.stringify(payload);
  }
};

const prepareInit = <T>(method: Methods, headers: Headers, payload?: T) => {
  const init: RequestInit = {
    method,
    headers,
  };

  if (payload !== undefined) {
    init.body = prepareBody(payload);
  }

  return init;
};

const collectResponse = async <T>(response: Response): Promise<CollectedResponse<T>> => {
  const { ok, status, statusText } = response;
  const details = { ok, status, statusText };

  if (response.headers.get('Content-Type')?.startsWith('application/json')) {
    const data = (await response.json()) as BasicResponse<T>;

    return {
      ...data,
      details,
    };
  } else {
    const data = await response.blob();

    return {
      data: (data as unknown) as T,
      message: null,
      details,
    };
  }
};

export const collectPaginationParams = (pagination: Pagination) =>
  new URLSearchParams({
    page: (pagination.page || 1).toString(),
    size: (pagination.size || 25).toString(),
    order: pagination.order || 'ASC',
  });

const requestWithoutPayload = async <T>(
  method: Methods,
  url: string = '/',
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(method, headers);

  return fetch(`${API_URL}${url}`, prepareInit(method, headers)).then(response =>
    collectResponse(response)
  );
};

const requestWithPayload = async <T, P>(
  method: Methods,
  url: string = '/',
  payload?: P,
  headers: Headers = new Headers()
): Promise<CollectedResponse<T>> => {
  await prepareHeaders(method, headers, payload);

  return fetch(`${API_URL}${url}`, prepareInit(method, headers, payload)).then(response =>
    collectResponse(response)
  );
};

const getMethod = <T>(url?: string, headers?: Headers) =>
  requestWithoutPayload<T>('GET', url, headers);

const postMethod = <T, P>(url?: string, payload?: P, headers?: Headers) =>
  requestWithPayload<T, P>('POST', url, payload, headers);

const putMethod = <T, P>(url?: string, payload?: P, headers?: Headers) =>
  requestWithPayload<T, P>('PUT', url, payload, headers);

const patchMethod = <T, P>(url?: string, payload?: P, headers?: Headers) =>
  requestWithPayload<T, P>('PATCH', url, payload, headers);

const deleteMethod = <T, P>(url?: string, payload?: P, headers?: Headers) =>
  requestWithPayload<T, P>('DELETE', url, payload, headers);

export const methods = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  patch: patchMethod,
  delete: deleteMethod,
};
