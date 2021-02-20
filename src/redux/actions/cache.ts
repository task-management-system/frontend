import { SET_CACHE } from 'redux/actionTypes';
import { TAction } from 'types/redux';
import { ICachePayload } from 'types/redux/payload';

export const setCache = <T>(
  name: string,
  duration: number,
  data: T
): TAction<ICachePayload<T>> => ({
  type: SET_CACHE,
  payload: {
    timestamp: Date.now(),
    duration,
    name,
    data,
  },
});
