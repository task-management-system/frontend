import { SET_CACHE } from 'redux/actionTypes';
import { CachePayload } from '../payload';

export interface SetCacheAction<T> {
  type: typeof SET_CACHE;
  payload: CachePayload<T>;
}
