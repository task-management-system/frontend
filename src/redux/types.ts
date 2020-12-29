import { Store, CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface IMetaData {
  authorized: boolean;
}

export type TState = CombinedState<{
  metaData: IMetaData;
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

export type TPayload = TNestedPayload | TPrimitivePayload;

export type TDispatch = (payload: TAction) => TAction;

export type TStore = Store<TPersistState, TAction> & { dispatch: TDispatch };
