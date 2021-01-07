import { Store, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { IClaim, INotification } from 'types';

export interface IMetaData {
  authorized: boolean;
  claims: IClaim[];
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

type TPayloadEntry = TNestedPayload | TPrimitivePayload | IClaim | INotification;

export type TPayload = TPayloadEntry | TPayloadEntry[];

export type TDispatch = (payload: TAction) => TAction;

export type TStore = Store<TPersistState, TAction> & { dispatch: TDispatch };
