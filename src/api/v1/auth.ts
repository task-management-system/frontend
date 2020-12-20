import { get, post } from './core';
import { Auth } from '../types';

export const token = (login: string, password: string) => {
  return post<Auth>('/token', { login, password });
};

export const auth = () => {
  return get('/auth');
};
