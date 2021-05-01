import { methods } from 'api/core';
import { extractRequest } from 'api/utils';
import { VERSION_URL } from './constants';
import { AllStatistics } from 'types';

export const getStatistics = () =>
  extractRequest(methods.get<AllStatistics>(`${VERSION_URL}/statistics`));
