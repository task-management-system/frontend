import { SET_USER, SET_PERMISSIONS } from 'redux/actionTypes';
import { IMetaData, TMetaDataAction } from 'types/redux/reducers';

const initialState: IMetaData = {
  user: null,
  permissions: [],
};

const metaDataReducer = (state: IMetaData = initialState, action: TMetaDataAction): IMetaData => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    default:
      return state;
  }
};

export default metaDataReducer;
