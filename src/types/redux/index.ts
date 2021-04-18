import { Store, Dispatch, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { MetaData, Notifications, Cache, Tabs, Users } from './reducers';

export type State = CombinedState<{
  metaData: MetaData;
  cache: Cache;
  tabs: Tabs;
  notifications: Notifications;
  users: Users;
}>;
export interface Action<T> {
  type: string;
  payload: T;
}

export type PersistState = State & PersistPartial;

export type AppStore = Store<PersistState, Action<any>> & { dispatch: Dispatch };
