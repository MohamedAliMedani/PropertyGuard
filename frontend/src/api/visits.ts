import client from './client';
import type { Visit } from '../types';

export const visitsApi = {
  getVisits: async (): Promise<Visit[]> => {
    const response = await client.get('/visits');
    return response.data;
  },

  updateStatus: async (id: number, data: { status: number; notes?: string }) => {
    const response = await client.put(`/visits/${id}/status`, data);
    return response.data;
  },
};
