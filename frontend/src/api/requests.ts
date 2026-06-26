import client from './client';
import type { VerificationRequest } from '../types';

export const requestsApi = {
  getMyRequests: async (): Promise<VerificationRequest[]> => {
    const response = await client.get('/requests');
    return response.data;
  },

  getRequest: async (id: number): Promise<VerificationRequest> => {
    const response = await client.get(`/requests/${id}`);
    return response.data;
  },

  createRequest: async (data: {
    propertyType: number;
    location: string;
    address: string;
    propertyPrice: number;
    servicePackageId: number;
  }) => {
    const response = await client.post('/requests', data);
    return response.data;
  },

  updateStatus: async (id: number, data: { status: number; progress?: number; notes?: string }) => {
    const response = await client.put(`/requests/${id}/status`, data);
    return response.data;
  },

  downloadReport: async (id: number) => {
    const response = await client.get(`/requests/${id}/report`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `REQ-${id}-Report.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  },
};
