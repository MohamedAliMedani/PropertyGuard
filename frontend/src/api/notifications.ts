import client from './client';
import type { Notification } from '../types';

export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    const response = await client.get('/notifications');
    return response.data;
  },

  markAsRead: async (id: number) => {
    await client.put(`/notifications/${id}/read`);
  },

  markAllAsRead: async () => {
    await client.put('/notifications/read-all');
  },
};
