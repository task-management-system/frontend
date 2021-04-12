import { SetCacheAction, RemoveCacheAction } from '../actions/cache';

export interface Cache {
  [key: string]: {
    timestamp: number;
    duration: number;
    data: any;
  } | null;
}

export type CacheAction = SetCacheAction<any> | RemoveCacheAction;
