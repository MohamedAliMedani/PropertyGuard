import client from './client';
import type { DashboardStats } from '../types';

export const adminApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await client.get('/admin/dashboard');
    return response.data;
  },

  getUsers: async () => {
    const response = await client.get('/admin/users');
    return response.data;
  },

  getExperts: async () => {
    const response = await client.get('/admin/experts');
    return response.data;
  },

  getAllRequests: async () => {
    const response = await client.get('/admin/requests');
    return response.data;
  },

  assignExpert: async (data: { requestId: number; expertId: string; role: string }) => {
    const response = await client.post('/admin/assign-expert', data);
    return response.data;
  },
};
