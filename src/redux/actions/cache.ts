import { SET_CACHE } from 'redux/actionTypes';
import { SetCacheAction } from 'types/redux/actions';

export const setCache = <T>(name: string, duration: number, data: T): SetCacheAction<T> => ({
  type: SET_CACHE,
  payload: {
    timestamp: Date.now(),
    duration,
    name,
    data,
  },
});
