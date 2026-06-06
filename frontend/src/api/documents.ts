import client from './client';
import type { Document } from '../types';

export const documentsApi = {
  upload: async (requestId: number, file: File): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('requestId', requestId.toString());

    const response = await client.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getByRequest: async (requestId: number): Promise<Document[]> => {
    const response = await client.get(`/documents/request/${requestId}`);
    return response.data;
  },

  download: (id: number) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://localhost:7001/api';
    window.open(`${baseUrl}/documents/${id}/download`, '_blank');
  },
};
