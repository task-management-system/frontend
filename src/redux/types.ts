import { Store, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface IMetaData {
  authorized: boolean;
}

export type TNotificationType = 'success' | 'error' | 'warning';

export interface INotification {
  id: string;
  type: TNotificationType;
  text: string;
}

export type TState = CombinedState<{
  metaData: IMetaData;
  notifications: INotification[];
}>;

export type TAction = {
  type: Symbol | string;
  payload: any;
};

export type TPersistState = TState & PersistPartial;

type TPrimitivePayload = string | number | boolean | null;
interface TNestedPayload {
  [key: string]: TPrimitivePayload;
}

export type TPayload = TNestedPayload | TPrimitivePayload | INotification;

export type TDispatch = (payload: TAction) => TAction;

export type TStore = Store<TPersistState, TAction> & { dispatch: TDispatch };
