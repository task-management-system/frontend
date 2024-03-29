import localForage from 'localforage';
import { store } from 'redux/store';
import { createNotification } from 'utils/notification';
import { reset } from 'redux/actions/common';
import { addNotification } from 'redux/actions/notifications';
import { setCache } from 'redux/actions/cache';
import { NotificationDetails } from 'types';
import { RequestWithCancel, CollectedResponse } from 'types/api';

export const removeToken = async () => {
  await localForage.removeItem('token');
};

export const getToken = async () => {
  const token = await localForage.getItem('token');

  return token;
};

export const setToken = async (token: string | null) => {
  return await localForage.setItem('token', token);
};

export const withAuthorization = <T>([
  handler,
  abort,
]: RequestWithCancel<T>): RequestWithCancel<T> => [
  handler.then(async response => {
    if (!response.details.ok && response.details.status === 401) {
      await removeToken();
      store.dispatch(reset());

      return Promise.reject(response);
    }

    return response;
  }),
  abort,
];

export const withNotification = <T>(
  [handler, abort]: RequestWithCancel<T>,
  detailsExtractor: (response: CollectedResponse<T>) => NotificationDetails | null = () => null
): RequestWithCancel<T> => [
  handler
    .then(response => {
      if (response.message !== null) {
        store.dispatch(
          addNotification(
            createNotification(
              response.message.type,
              response.message.text,
              detailsExtractor(response)
            )
          )
        );
      }

      return Promise.resolve(response);
    })
    .catch((error: CollectedResponse<T> | any) => {
      if (error?.name === 'AbortError') {
        return Promise.reject();
      }

      if (typeof error.message === 'object' && 'type' in error.message && 'text' in error.message) {
        store.dispatch(
          addNotification(
            createNotification(error.message.type, error.message.text, detailsExtractor(error))
          )
        );
      } else {
        store.dispatch(addNotification(createNotification('error', 'Кажется что-то пошло не так')));
      }

      return Promise.reject(error);
    }),
  abort,
];

export const withCache = <X extends any[], T>(
  name: string,
  duration: number,
  handler: (...args: X) => Promise<CollectedResponse<T>>
) => {
  return (...args: X): Promise<CollectedResponse<T>> => {
    const { cache } = store.getState();
    const isCached = name in cache;
    const isExpired =
      duration === 0 || (cache[name]?.timestamp || 0) + (cache[name]?.duration || 0) < Date.now();

    if (isCached && !isExpired) {
      return new Promise(resolve =>
        resolve({
          data: cache[name]!.data,
          details: {
            ok: true,
            status: 0,
            statusText: 'Restored from cache',
          },
          message: null,
        })
      );
    } else {
      return handler(...args).then(response => {
        if (response.details.ok) {
          store.dispatch(setCache(name, duration, response.data));
        }

        return Promise.resolve(response);
      });
    }
  };
};

export const extractRequest = <T>([handler, abort]: RequestWithCancel<T>) => handler;
