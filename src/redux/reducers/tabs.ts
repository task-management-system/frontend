import { SET_GROUP, SET_STATUS } from 'redux/actionTypes';
import { ITabs, TTabsAction } from 'types/redux/reducers';
import { APPOINTED } from 'constants/tasks';

const initialState: ITabs = {
  group: APPOINTED,
  status: null,
};

const tabsReducer = (state: ITabs = initialState, action: TTabsAction): ITabs => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default tabsReducer;
