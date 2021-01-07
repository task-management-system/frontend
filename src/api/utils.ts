import localForage from 'localforage';
import { store } from 'redux/store';
import { addNotification } from 'redux/actions/notifications';
import { Response } from './types';
import { createNotification } from 'utils/notification';

export const getToken = async () => {
  const token = await localForage.getItem('token');

  return token;
};

export const setToken = async (token: string | null) => {
  return await localForage.setItem('token', token);
};

export const withNotification = <T>(handler: Promise<Response<T>>): Promise<Response<T>> => {
  return handler
    .then(response => {
      if (response.message !== null) {
        store.dispatch(
          addNotification(createNotification(response.message.type, response.message.text))
        );
      }

      return response;
    })
    .catch(error => {
      store.dispatch(addNotification(createNotification('error', 'Кажется что-то пошло не так')));

      return error;
    });
};
