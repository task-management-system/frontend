import { SET_CACHE, REMOVE_CACHE } from 'redux/actionTypes';
import { CachePayload } from '../payload';

export interface SetCacheAction<T> {
  type: typeof SET_CACHE;
  payload: CachePayload<T>;
}

export interface RemoveCacheAction {
  type: typeof REMOVE_CACHE;
  payload: string;
}
