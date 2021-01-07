import { UPDATE_AUTHORIZED, SET_CLAIMS } from 'redux/actionTypes';
import { TAction, IMetaData } from '../types';

const initialState: IMetaData = {
  authorized: false,
  claims: [],
};

const metaDataReducer = (state: IMetaData = initialState, action: TAction): IMetaData => {
  switch (action.type) {
    case UPDATE_AUTHORIZED:
      return {
        ...state,
        authorized: action.payload !== null,
      };
    case SET_CLAIMS:
      return {
        ...state,
        claims: action.payload,
      };
    default:
      return state;
  }
};

export default metaDataReducer;
