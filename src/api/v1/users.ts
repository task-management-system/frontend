import { get } from './core';
import { withNotification } from '../utils';

export const getUsers = () => withNotification(get<{}>('/users'));
