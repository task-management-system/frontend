import { SET_CACHE } from 'redux/actionTypes';
import { TAction, ICache } from 'types/redux';
import { ICachePayload } from 'types/redux/payload';

const initialState: ICache = {
  roles: null,
};

const metaDataReducer = (
  state: ICache = initialState,
  action: TAction<ICachePayload<any>>
): ICache => {
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
