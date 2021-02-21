import { SET_CACHE } from 'redux/actionTypes';
import { ICache, TCacheAction } from 'types/redux/reducers';

const initialState: ICache = {
  roles: null,
};

const metaDataReducer = (state: ICache = initialState, action: TCacheAction): ICache => {
  switch (action.type) {
    case SET_CACHE:
      return {
        ...state,
        [action.payload.name]: {
          timestamp: action.payload.timestamp,
          duration: action.payload.duration,
          data: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default metaDataReducer;
