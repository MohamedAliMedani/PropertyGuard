import client from './client';
import type { AuthResponse, LoginDto, RegisterDto } from '../types';

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  getMe: async () => {
    const response = await client.get('/users/me');
    return response.data;
  },
};
