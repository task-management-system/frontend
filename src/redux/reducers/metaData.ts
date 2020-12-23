import { UPDATE_AUTHORIZED } from 'redux/actionTypes';
import { TAction, IMetaData } from '../types';

const initialState: IMetaData = {
  authorized: false,
};

const metaDataRecuder = (state: IMetaData = initialState, action: TAction): IMetaData => {
  switch (action.type) {
    case UPDATE_AUTHORIZED:
      return { ...state, authorized: true };
    default:
      return state;
  }
};

export default metaDataRecuder;
