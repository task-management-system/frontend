import { Store, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { IMetaData, TNotifications, ICache, ITabs } from './reducers';

export type TState = CombinedState<{
  metaData: IMetaData;
  notifications: TNotifications;
  cache: ICache;
  tabs: ITabs;
}>;
export interface IAction<T> {
  type: string;
  payload: T;
}

export type TPersistState = TState & PersistPartial;

export type TDispatch = <T>(payload: IAction<T>) => IAction<T>;

export type TStore = Store<TPersistState, IAction<any>> & { dispatch: TDispatch };
