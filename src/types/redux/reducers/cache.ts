import { ISetCacheAction } from '../actions/cache';

export interface ICache {
  [key: string]: {
    timestamp: number;
    duration: number;
    data: any;
  } | null;
}

export type TCacheAction = ISetCacheAction<any>;
