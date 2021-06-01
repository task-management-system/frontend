import { SET_USER, UPDATE_USER_ROLE, SET_PERMISSIONS, SET_STATUSES } from 'redux/actionTypes';
import { MetaData, MetaDataAction } from 'types/redux/reducers';

const initialState: MetaData = {
  user: null,
  permissions: [],
  statuses: [],
};

const metaDataReducer = (state: MetaData = initialState, action: MetaDataAction): MetaData => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER_ROLE:
      return {
        ...state,
        user: {
          ...state.user!,
          role: action.payload,
        },
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
