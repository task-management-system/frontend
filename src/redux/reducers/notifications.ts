import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actionTypes';
import { TAction } from 'types/redux';
import { INotification } from 'types';

const initialState: INotification[] = [];

const metaDataReducer = (
  state: INotification[] = initialState,
  action: TAction
): INotification[] => {
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
