import localForage from 'localforage';
import { store } from 'redux/store';
import { reset } from 'redux/actions/common';
import { addNotification } from 'redux/actions/notifications';
import { TCollectedResponse } from 'types/api';
import { createNotification } from 'utils/notification';

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

export const withAuthorization = <T>(
  handler: Promise<TCollectedResponse<T>>
): Promise<TCollectedResponse<T>> =>
  handler.then(response => {
    if (!response.details.ok && response.details.status === 401) {
      store.dispatch(reset());

      return Promise.reject(response);
    }

    return response;
  });

export const withNotification = <T>(
  handler: Promise<TCollectedResponse<T>>
): Promise<TCollectedResponse<T>> =>
  handler
    .then(response => {
      if (response.message !== null) {
        store.dispatch(
          addNotification(createNotification(response.message.type, response.message.text))
        );
      }

      return Promise.resolve(response);
    })
    .catch((error: TCollectedResponse<T> | any) => {
      if ('type' in error.message && 'text' in error.message) {
        store.dispatch(addNotification(createNotification(error.message.type, error.message.text)));
      } else {
        store.dispatch(addNotification(createNotification('error', 'Кажется что-то пошло не так')));
      }

      return Promise.reject(error);
    });
