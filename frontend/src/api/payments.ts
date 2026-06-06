import client from './client';
import type { Payment } from '../types';

export const paymentsApi = {
  getMyPayments: async (): Promise<Payment[]> => {
    const response = await client.get('/payments');
    return response.data;
  },

  createPayment: async (data: { requestId: number; amount: number; method: number }) => {
    const response = await client.post('/payments', data);
    return response.data;
  },
};
