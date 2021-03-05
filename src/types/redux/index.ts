import { Store, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { MetaData, Notifications, Cache, Tabs } from './reducers';

export type State = CombinedState<{
  metaData: MetaData;
  notifications: Notifications;
  cache: Cache;
  tabs: Tabs;
}>;
export interface Action<T> {
  type: string;
  payload: T;
}

export type PersisState = State & PersistPartial;

export type Dispatch = <T>(payload: Action<T>) => Action<T>;

export type AppStore = Store<PersisState, Action<any>> & { dispatch: Dispatch };
