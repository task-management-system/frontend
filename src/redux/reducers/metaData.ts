import { SET_USER, SET_CLAIMS } from 'redux/actionTypes';
import { TAction, IMetaData } from 'types/redux';

const initialState: IMetaData = {
  user: null,
  claims: [],
};

const metaDataReducer = (state: IMetaData = initialState, action: TAction): IMetaData => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
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
