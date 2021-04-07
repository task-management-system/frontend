import { SET_USERS, UPDATE_USER } from 'redux/actionTypes';
import { Users, UsersAction } from 'types/redux/reducers';

const initialState: Users = [];

const usersReducer = (state: Users = initialState, action: UsersAction): Users => {
  switch (action.type) {
    case SET_USERS:
      return [...action.payload];
    case UPDATE_USER:
      return [...state.map(user => (user.id === action.payload.id ? action.payload : user))];
    default:
      return state;
  }
};

export default usersReducer;
