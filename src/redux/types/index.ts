import { CombinedState } from 'redux';
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

export type TStore = TState & PersistPartial;

type TPrimitivePayload = string | number | boolean | null;
interface TNestedPayload {
  [key: string]: TPrimitivePayload;
}

export type TPayload = TNestedPayload | TPrimitivePayload;
