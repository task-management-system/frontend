import { SET_GROUP, SET_STATUS, RESET_STATUS } from 'redux/actionTypes';
import { Tabs, TabsAction } from 'types/redux/reducers';
import { RECEIVED } from 'constants/tasks';

const initialState: Tabs = {
  group: RECEIVED,
  status: null,
};

const tabsReducer = (state: Tabs = initialState, action: TabsAction): Tabs => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case SET_STATUS:
    case RESET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default tabsReducer;
