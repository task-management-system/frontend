import { SET_CACHE } from 'redux/actionTypes';
import { ICachePayload } from '../payload';

export interface ISetCacheAction<T> {
  type: typeof SET_CACHE;
  payload: ICachePayload<T>;
}
