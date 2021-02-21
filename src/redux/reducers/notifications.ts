import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';
import { TNotifications, TNotificationsAction } from 'types/redux/reducers';

const initialState: TNotifications = [];

const metaDataReducer = (
  state: TNotifications = initialState,
  action: TNotificationsAction
): TNotifications => {
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
