import { methods } from 'api/core';
import { VERSION_URL } from './constants';
import { AllStatistics } from 'types';

export const getStatistics = () => methods.get<AllStatistics>(`${VERSION_URL}/statistics`);
