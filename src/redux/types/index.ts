import { CombinedState } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface IMetaData {}

export type TState = CombinedState<{
  metaData: IMetaData;
}>;

export type TAction = {
  type: Symbol | string;
  payload: any;
};

export type TStore = TState & PersistPartial;
