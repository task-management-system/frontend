import { SET_CACHE, REMOVE_CACHE } from 'redux/actionTypes';
import { SetCacheAction, RemoveCacheAction } from 'types/redux/actions';

export const setCache = <T>(name: string, duration: number, data: T): SetCacheAction<T> => ({
  type: SET_CACHE,
  payload: {
    timestamp: Date.now(),
    duration,
    name,
    data,
  },
});

export const removeCache = (name: string): RemoveCacheAction => ({
  type: REMOVE_CACHE,
  payload: name,
});
