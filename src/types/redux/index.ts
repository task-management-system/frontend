import { Store, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { IMetaData } from './reducers/metaData';
import { TNotifications } from './reducers/notifications';
import { ICache } from './reducers/cache';

export type TState = CombinedState<{
  metaData: IMetaData;
  notifications: TNotifications;
  cache: ICache;
}>;
export interface IAction<T> {
  type: string;
  payload: T;
}

export type TPersistState = TState & PersistPartial;

export type TDispatch = <T>(payload: IAction<T>) => IAction<T>;

export type TStore = Store<TPersistState, IAction<any>> & { dispatch: TDispatch };
