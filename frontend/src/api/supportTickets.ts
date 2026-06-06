import client from './client';

export interface SupportTicket {
  id: number;
  userName: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  resolvedAt?: string;
}

export const supportTicketsApi = {
  getAll: async (): Promise<SupportTicket[]> => {
    const response = await client.get('/support-tickets');
    return response.data;
  },

  create: async (data: { subject: string; description: string; priority: number }) => {
    const response = await client.post('/support-tickets', data);
    return response.data;
  },

  updateStatus: async (id: number, data: { status: number }) => {
    const response = await client.put(`/support-tickets/${id}/status`, data);
    return response.data;
  },
};
