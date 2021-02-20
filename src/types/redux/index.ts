import { Store, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { IUser, IPermission, INotification } from 'types';

export interface IMetaData {
  user: IUser | null;
  permissions: IPermission[];
}

export interface ICache {
  [key: string]: {
    timestamp: number;
    duration: number;
    data: any;
  } | null;
}

export type TState = CombinedState<{
  metaData: IMetaData;
  notifications: INotification[];
  cache: ICache;
}>;

export type TAction<T extends any> = {
  type: Symbol | string;
  payload: T;
};

export type TPersistState = TState & PersistPartial;

type TPrimitivePayload = string | number | boolean | null;

interface TNestedPayload {
  [key: string]: TPrimitivePayload;
}

type TPayloadEntry = TNestedPayload | TPrimitivePayload | IUser | IPermission | INotification;

export type TPayload = TPayloadEntry | TPayloadEntry[];

export type TDispatch = (payload: TAction<any>) => TAction<any>;

export type TStore = Store<TPersistState, TAction<any>> & { dispatch: TDispatch };
