import { SET_CACHE, REMOVE_CACHE } from 'redux/actionTypes';
import { Cache, CacheAction } from 'types/redux/reducers';

const initialState: Cache = {
  roles: null,
};

const cacheReducer = (state: Cache = initialState, action: CacheAction): Cache => {
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
    case REMOVE_CACHE:
      return {
        ...state,
        [action.payload]: null,
      };
    default:
      return state;
  }
};

export default cacheReducer;
