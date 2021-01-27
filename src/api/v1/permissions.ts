import { get } from './core';
import { IClaim } from 'types';

export const getClaims = () => get<IClaim[]>('/permissions');
