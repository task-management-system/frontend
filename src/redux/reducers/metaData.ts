import { SET_USER, SET_PERMISSIONS, SET_STATUSES } from 'redux/actionTypes';
import { IMetaData, TMetaDataAction } from 'types/redux/reducers';

const initialState: IMetaData = {
  user: null,
  permissions: [],
  statuses: [],
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
    case SET_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      };
    default:
      return state;
  }
};

export default metaDataReducer;
