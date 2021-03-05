import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';
import { Notifications, NotificationsAction } from 'types/redux/reducers';

const initialState: Notifications = [];

const metaDataReducer = (
  state: Notifications = initialState,
  action: NotificationsAction
): Notifications => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [action.payload, ...state];
    case REMOVE_NOTIFICATION:
      return [...state.filter(notification => notification.id !== action.payload)];
    default:
      return state;
  }
};

export default metaDataReducer;
