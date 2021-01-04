import { UPDATE_AUTHORIZED } from 'redux/actionTypes';
import { TAction, IMetaData } from '../types';

const initialState: IMetaData = {
  authorized: false,
};

const metaDataReducer = (state: IMetaData = initialState, action: TAction): IMetaData => {
  switch (action.type) {
    case UPDATE_AUTHORIZED:
      return {
        ...state,
        authorized: action.payload !== null,
      };
    default:
      return state;
  }
};

export default metaDataReducer;
