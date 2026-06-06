import client from './client';
import type { ServicePackage } from '../types';

export const packagesApi = {
  getAll: async (): Promise<ServicePackage[]> => {
    const response = await client.get('/packages');
    return response.data;
  },
};
