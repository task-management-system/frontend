import { get } from './core';
import { withNotification, withAuthorization } from '../utils';

export const getUsers = () => withNotification(withAuthorization(get<{}>('/users')));
